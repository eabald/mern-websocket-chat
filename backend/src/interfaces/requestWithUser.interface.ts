import { Request } from 'express';
import Session from './session.interface';
import User from './user.interface';

interface RequestWithUser extends Request {
  user: User;
  session: Session;
}

export default RequestWithUser;
