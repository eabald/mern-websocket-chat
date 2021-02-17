import * as express from 'express';
import * as socketio from 'socket.io';
import { Server } from 'http';
import Controller from '../interfaces/controller.interface';
import socketAuth from '../middleware/socketAuth.middleware'

class MessageController implements Controller {
  public path = '/message';
  public router = express.Router();
  private websocket: socketio.Server;

  constructor() {
    //
  }

  public initializeWebsocket(server: Server) : void {
    this.websocket  = new socketio.Server(server, { cors: { origin: '*' } });
    this.websocket.use(socketAuth);
    this.websocket.on('connection', this.setupConnection);
  }

  private setupConnection(socket: socketio.Socket) : void {
    socket.on('message', message => console.log(message));
  }

}

export default MessageController;
