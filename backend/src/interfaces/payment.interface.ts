import User from './user.interface';

interface Payment {
  id: string;
  _id: string;
  sessionId: string;
  value: number;
  status: 'paid' | 'unpaid' | 'no_payment_required';
  type: 'invitations' | 'rooms';
  user: User;
}

export default Payment;
