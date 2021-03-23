import User from './user.interface';
import Message from './message.interface';

interface Room {
  _id: string;
  name: string;
  users: User[];
  messages: Message[];
  type: string;
}

export default Room;
