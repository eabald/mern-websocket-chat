import User from './user.interface'

interface Invitation {
  email: string;
  invitedBy: User;
  timestamp: Date;
  token: string;
}

export default Invitation;
