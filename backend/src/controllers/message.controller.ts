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

  // workout better naming convention
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
    const newMessage = await this.message.create(message);
    const room = await this.room.findById(message.room._id);
    room.messages.push(newMessage);
    await room.save();
    const usersInRoom = await this.user.find({ _id: { $in: room.users } });
    usersInRoom.forEach((user) => {
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
    socket.broadcast.to(message.room._id).emit('messageReceived', newMessage);
    socket.nsp.to(message.room._id).emit('messageReceived', newMessage);
  }
}

export default MessageController;
