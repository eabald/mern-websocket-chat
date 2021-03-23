import * as express from 'express';
import * as socketio from 'socket.io';
import { Server } from 'http';
import { createAdapter } from 'socket.io-redis';
import { RedisClient } from 'redis';
import Controller from '../interfaces/controller.interface';
import socketAuth from '../middleware/socketAuth.middleware';
import Message from '../interfaces/message.interface';
import messageModel from '../models/message.model';
import SocketWithUser from '../interfaces/socketWithUser.interface';
import userModel from './../models/user.model';
import roomModel from '../models/room.model';

class MessageController implements Controller {
  public path = '/message';
  public router = express.Router();
  private websocket: socketio.Server;
  private message = messageModel;
  private user = userModel;
  private room = roomModel;
  private pubClient: RedisClient;
  private subClient: RedisClient;

  constructor() {
    //
  }

  public initializeWebsocket(server: Server): void {
    this.websocket = new socketio.Server(server, { cors: { origin: '*' } });
    this.pubClient = new RedisClient({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });
    this.subClient = this.pubClient.duplicate();
    this.websocket.adapter(
      createAdapter({ pubClient: this.pubClient, subClient: this.subClient })
    );
    this.websocket.use(socketAuth);
    this.websocket.on('connection', (socket: SocketWithUser) =>
      this.bindSocketEvents(socket, this.websocket)
    );
  }

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
    socket.user.rooms.forEach((room) => socket.join(room._id));
  }

  private async messageReceived(
    message: Message,
    socket: SocketWithUser,
    websocket: socketio.Server
  ): Promise<void> {
    let newMessage = await this.message.create(message);
    newMessage = await newMessage.populate('user').execPopulate()
    const room = await this.room.findById(message.room._id);
    const isBlocked = room.users.some(user => socket.user.blockedBy.includes(user));
    if (room.type === 'dm' && isBlocked) {
      console.log('here');
      socket.emit('messageBlocked', {
        status: 'blocked',
        message: 'Sending message to this user has been blocked.'
      });
      return;
    }
    room.messages.push(newMessage);
    await room.save();
    const usersInRoom = await this.user.find({ _id: { $in: room.users } });
    usersInRoom.forEach(async (user) => {
      const alreadyUnread = user.unread.map(item => item._id.toString()).includes(message.room._id);
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
      socket.nsp.to(message.room._id).emit('messageReceived', newMessage);
    }, 100);
  }
}

export default MessageController;
