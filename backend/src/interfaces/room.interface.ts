import User from './user.interface';

interface Room {
  _id: string;
  name: string;
  users: User[]
}

export default Room;
