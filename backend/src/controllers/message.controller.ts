import * as express from 'express';
import * as socketio from 'socket.io';
import { Server } from 'http';
import Controller from '../interfaces/controller.interface';
import AuthenticationService from '../services/authentication.service';

class MessageController implements Controller {
  public path = '/message';
  public router = express.Router();
  private websocket: socketio.Server;
  private authService: AuthenticationService;

  constructor() {
    this.authService = new AuthenticationService();
  }

  public initializeWebsocket(server: Server) : void {
    this.websocket  = new socketio.Server(server, { cors: { origin: '*' } });
    this.websocket.use(async (socket: socketio.Socket, next: (err?: Error) => void) : Promise<void> => {
      const authToken = socket.handshake.auth.token ?? '';
      const err = new Error('Unauthorized');
      err.message = 'Unauthorized';
      if (authToken) {
        try {
          const user = this.authService.findAndVerifyUser(authToken);
          if (user) {
            // set socet id in user model
            next();
          } else {
            next(err);
            socket.disconnect(true);
          }
        } catch (error) {
          next(err);
          socket.disconnect(true);
        }
      } else {
        next(err);
        socket.disconnect(true);
      }
    });
    this.websocket.on('connection', this.setupConnection);
  }

  private setupConnection(socket: socketio.Socket) : void {
    socket.on('message', message => console.log(message));
  }

}

export default MessageController;
