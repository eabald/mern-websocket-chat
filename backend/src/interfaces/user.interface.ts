import Room from './room.interface';

interface User {
  id: string;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  socketId: string;
  rooms: Room[];
  save: any;
}

export default User;
