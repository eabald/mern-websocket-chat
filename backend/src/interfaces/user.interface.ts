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
  blockedBy: User[]
  rooms: Room[];
  save: any;
  unread: Room[];
  verificationToken: string;
  emailVerified: boolean;
  resetToken: string;
}

export default User;
