import * as express from 'express';
import * as socketio from 'socket.io';
import { Server } from 'http';
import { createAdapter } from 'socket.io-redis';
import { RedisClient } from 'redis';
import Controller from '../interfaces/controller.interface';
import Message from '../interfaces/message.interface';
import messageModel from '../models/message.model';
import SocketWithUser from '../interfaces/socketWithUser.interface';
import userModel from './../models/user.model';
import roomModel from '../models/room.model';
import passportSocketIo from 'passport.socketio';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { i18n } from 'i18next';

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

  constructor(server: Server, redisClient: RedisClient, i18next: i18n) {
    this.server = server;
    this.redisClient = redisClient;
    this.i18n = i18next;
    this.initializeWebsocket();
  }

  private initializeWebsocket(): void {
    this.websocket = new socketio.Server(this.server, {
      cors: { origin: '*' },
    });
    const pubClient = this.redisClient;
    const subClient = pubClient.duplicate();
    this.websocket.adapter(createAdapter({ pubClient, subClient }));
    const RedisStore = connectRedis(session);
    this.websocket.use(
      passportSocketIo.authorize({
        secret: process.env.SESSION_SECRET,
        store: new RedisStore({
          client: this.redisClient,
          disableTouch: true,
        }),
      })
    );

    subClient.on('message', this.notifyPaymentFulfilled);
    subClient.subscribe('payments');
    this.websocket.use(this.setSocketId);
    this.websocket.on('connection', (socket: SocketWithUser) =>
      this.bindSocketEvents(socket, this.websocket)
    );
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
    socket.on('messageSent', (message) =>
      this.messageReceived(message, socket, websocket)
    );
  }

  private rejoinUserRooms(socket: SocketWithUser): void {
    socket.request.user.rooms.forEach((room) => socket.join(room._id));
  }

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
