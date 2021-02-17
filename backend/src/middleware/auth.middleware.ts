import { NextFunction, Response } from 'express';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import AuthenticationService from '../services/authentication.service';

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) : Promise<void> {
  const cookies = request.cookies;
  const authService = new AuthenticationService();
  if (cookies && cookies.Authorization) {
    try {
      const user = await authService.findAndVerifyUser(cookies.Authorization);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
