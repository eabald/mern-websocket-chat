import Room from './room.interface';
import Subscription from './subscription.interface';
import Payment from './payment.interface';

interface User {
  id: string;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  socketId: string;
  blockedBy: User[];
  rooms: Room[];
  save: any;
  unread: Room[];
  verificationToken: string;
  emailVerified: boolean;
  resetToken: string;
  subscription?: Subscription;
  fomo: {
    invitations: number;
    invitationsFulfilled: number;
    refreshDate: Date;
    roomsLimit: number;
  };
  payments: Payment[];
}

export default User;
