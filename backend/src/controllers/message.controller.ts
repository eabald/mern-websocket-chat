import * as express from 'express';
import * as socketio from 'socket.io';
import { Server } from 'http';
import { createAdapter } from 'socket.io-redis';
import { RedisClient, createClient } from 'redis';
import Controller from '../interfaces/controller.interface';
import Message from '../interfaces/message.interface';
import messageModel from '../models/message.model';
import SocketWithUser from '../interfaces/socketWithUser.interface';
import userModel from './../models/user.model';
import roomModel from '../models/room.model';
import passportSocketIo from 'passport.socketio';
import session from 'express-session';
import connectRedis from 'connect-redis';

class MessageController implements Controller {
  public path = '/message';
  public router = express.Router();
  private websocket: socketio.Server;
  private message = messageModel;
  private user = userModel;
  private room = roomModel;
  private redisClient: RedisClient;
  private server: Server

  constructor(server: Server, redisClient: RedisClient) {
    this.server = server;
    this.redisClient = redisClient;
    this.initializeWebsocket();
  }

  private initializeWebsocket(): void {
    this.websocket = new socketio.Server(this.server, { cors: { origin: '*' } });
    const pubClient = this.redisClient;
    const subClient = pubClient.duplicate();
    this.websocket.adapter(
      createAdapter({ pubClient, subClient })
    );
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
        message: 'Sending message to this user has been blocked.',
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
}

export default MessageController;
