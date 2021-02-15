import Room from './room.interface';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  rooms: Room[];
}

export default User;
