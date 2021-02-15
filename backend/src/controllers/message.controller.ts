import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import { createServer, Server } from 'http';
import { server, connection, request } from 'websocket';

class MessageController implements Controller {
  public path = '/message';
  public router = express.Router();
  private httpServer: Server;
  private websocket: server;
  private socket: connection;

  constructor() {
    this.initializeWebsocket();
    this.httpServer.listen(8001);
  }

  private initializeWebsocket() {
    this.httpServer = createServer();
    this.websocket  = new server({ httpServer: this.httpServer});
    this.websocket.on('request', this.validateRequest);
  }

  private validateRequest(req: request) : void {
    this.socket = req.accept(null, req.origin);
    console.log(req.cookies);
    // validate cookie
    this.bindEvents();
  }

  private bindEvents() : void {
    this.socket.on('message', message => this.socket.send(`got your message: ${message.utf8Data}`))
  }
}

export default MessageController;
