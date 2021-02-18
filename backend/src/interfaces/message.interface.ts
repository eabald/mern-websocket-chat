import Room from './room.interface';
import User from './user.interface';

interface Message {
  content: string;
  user: User;
  room: Room;
  timestamp: Date;
}

export default Message;
