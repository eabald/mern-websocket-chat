import { Socket } from 'socket.io';
import User from './user.interface';

interface SocketWithUser extends Socket {
  user: User;
}

export default SocketWithUser;
