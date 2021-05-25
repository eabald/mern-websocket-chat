import * as express from 'express';
import * as socketio from 'socket.io';
import { Server } from 'http';
import { createAdapter } from '@socket.io/redis-adapter'
import { RedisClient } from 'redis';
import Controller from '../interfaces/controller.interface';
import Message from '../interfaces/message.interface';
import messageModel from '../models/message.model';
import SocketWithUser from '../interfaces/socketWithUser.interface';
import userModel from './../models/user.model';
import roomModel from '../models/room.model';
import { i18n } from 'i18next';
import passport from 'passport';

class MessageController implements Controller {
  public path = '/message';
  public router = express.Router();
  private websocket: socketio.Server;
  private message = messageModel;
  private user = userModel;
  private room = roomModel;
  private redisClient: RedisClient;
  private server: Server;
  private i18n: i18n;
  private sessionMiddleware: express.RequestHandler;

  constructor(
    server: Server,
    redisClient: RedisClient,
    i18next: i18n,
    session: express.RequestHandler
  ) {
    this.server = server;
    this.redisClient = redisClient;
    this.i18n = i18next;
    this.sessionMiddleware = session;
    this.initializeWebsocket();
  }

  private initializeWebsocket(): void {
    this.websocket = new socketio.Server(this.server, {
      cors: {
        origin: true,
      },
    });
    const pubAdapterClient = this.redisClient;
    const subAdapterClient = pubAdapterClient.duplicate();
    const subClient = this.redisClient.duplicate();
    this.websocket.adapter(
      createAdapter(pubAdapterClient, subAdapterClient)
    );
    const wrap = (middleware) => (socket, next) =>
      middleware(socket.request, {}, next);
    this.websocket.use(wrap(this.sessionMiddleware));
    this.websocket.use(wrap(passport.initialize()));
    this.websocket.use(wrap(passport.session()));
    this.websocket.use((socket: SocketWithUser, next: any) => {
      if (socket.request.user) {
        next();
      } else {
        next(new Error('unauthorized'));
      }
    });
    if (process.env.NODE_ENV === 'development') {
      this.websocket.engine.on('connection_error', (err: any) =>
        console.log('err', err)
      );
    }
    subClient.on('message', this.notifyPaymentFulfilled);
    subClient.subscribe('payments');
    this.websocket.use(this.setSocketId);
    this.websocket.on('connection', (socket: SocketWithUser) => {
      this.bindSocketEvents(socket, this.websocket);
      if (process.env.NODE_ENV === 'development') {
        socket.on('disconnect', (reason) => {
          console.log(reason);
        });
      }
      socket.on('disconnecting', () => {
        socket.request.user.rooms.forEach((room) => {
          socket.broadcast.to(room._id).emit('userLeft', {
            roomID: room._id,
            userId: socket.request.user._id,
          });
        });
      });
    });
  }

  private setSocketId = async (
    socket: SocketWithUser,
    next: () => void
  ): Promise<void> => {
    let user = await this.user.findById(socket.request.user._id);
    if (user && user.socketId !== socket.id) {
      user.socketId = socket.id;
      user = await user.save();
      next();
    } else {
      next();
    }
  };

  private bindSocketEvents(
    socket: SocketWithUser,
    websocket: socketio.Server
  ): void {
    this.rejoinUserRooms(socket);
    this.showLoggedInfo(socket, websocket);
    socket.on('messageSent', (message) =>
      this.messageReceived(message, socket, websocket)
    );
  }

  private rejoinUserRooms = async (socket: SocketWithUser): Promise<void> => {
    const user = await this.user.findById(socket.request.user.id).populate('rooms');
    user.rooms.forEach((room) => {
      socket.join(room._id);
    });
  };

  private showLoggedInfo = async (
    socket: SocketWithUser,
    websocket: socketio.Server
  ): Promise<void> => {
    const activeUsers = [];
    const rooms = await this.room
      .find({
        _id: { $in: socket.request.user.rooms },
        type: { $eq: 'dm' },
      })
      .populate('users');
    rooms.forEach((room) => {
      socket.broadcast.to(room._id).emit('userActive', {
        roomID: room._id,
        userId: socket.request.user._id,
      });
      const usersInDB = room.users.map((user) => ({
        userId: user.id,
        socketId: user.socketId,
      }));
      usersInDB.forEach(({ socketId, userId }) => {
        if (websocket.sockets.sockets.has(socketId)) {
          activeUsers.push({ roomId: room._id, userId });
        }
      });
    });
    socket.emit('activeUsers', activeUsers);
  };

  private async messageReceived(
    message: Message,
    socket: SocketWithUser,
    websocket: socketio.Server
  ): Promise<void> {
    let newMessage = await this.message.create(message);
    newMessage = await newMessage.populate('user').execPopulate();
    const room = await this.room.findById(message.room._id);
    const isBlocked = room.users.some((user) =>
      socket.request.user.blockedBy.includes(user)
    );
    if (room.type === 'dm' && isBlocked) {
      socket.emit('messageBlocked', {
        status: 'blocked',
        message: this.i18n.t('Sending message to this user has been blocked.'),
      });
      return;
    }
    room.messages.push(newMessage);
    await room.save();
    const usersInRoom = await this.user.find({ _id: { $in: room.users } });
    usersInRoom.forEach(async (user) => {
      const alreadyUnread = user.unread
        .map((item) => item._id.toString())
        .includes(message.room._id);
      if (message.user.id !== user.id && !alreadyUnread) {
        user.unread.push(message.room);
        await user.save();
      }
      const userSocket: socketio.Socket = websocket.sockets.sockets.get(
        user.socketId
      );
      if (userSocket) {
        const isUserInRoom = userSocket.rooms.has(message.room._id);
        if (!isUserInRoom) {
          userSocket.join(message.room._id);
        }
      }
    });
    setTimeout(() => {
      socket.broadcast.to(message.room._id).emit('messageReceived', newMessage);
      socket.emit('messageReceived', newMessage);
    }, 100);
  }

  private notifyPaymentFulfilled = async (chanel: string, message: string) => {
    const paymentData = JSON.parse(message);
    const user = await this.user.findById(paymentData.userId);
    const userSocketId = user.socketId;
    const userSocket = this.websocket.sockets.sockets.get(userSocketId);
    const statusMessage = {
      status: 'success',
      message: this.i18n.t(
        paymentData.payment
          ? `You didn't finished your last payment, click this message to continue.`
          : 'Your last payment already fulfilled.'
      ),
      additionalData: paymentData.payment,
    };
    userSocket.emit(
      paymentData.payment ? 'paymentToContinue' : 'paymentFulfilled',
      statusMessage
    );
  };
}

export default MessageController;
