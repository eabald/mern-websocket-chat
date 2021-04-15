import { IncomingMessage } from 'node:http';
import { Socket } from 'socket.io';
import User from './user.interface';

interface RequestUser extends IncomingMessage {
  user: User;
}
interface SocketWithUser extends Socket {
  request: RequestUser;
}

export default SocketWithUser;
