import Room from './room.interface';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  socketId: string;
  rooms: Room[];
  save: any;
}

export default User;
