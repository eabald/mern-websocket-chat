import { NextFunction, Response } from 'express';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import RequestWithUser from '../interfaces/requestWithUser.interface';

async function authMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction
): Promise<void> {
  if (request.isAuthenticated()) {
    next();
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
