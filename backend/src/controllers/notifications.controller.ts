import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import userModel from '../models/user.model';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authMiddleware from '../middleware/auth.middleware';
import VerificationTokenExpiredException from '../exceptions/AuthenticationTokenExpiredException';

class NotificationsController implements Controller {
  public path = '/notifications';
  public router = express.Router();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/subscribe`, authMiddleware, this.subscribe);
  }

  private subscribe = async (
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const user = await this.user.findById(request.user._id);
    if (user) {
      user.subscription = request.body;
      const subscribedUser = await user.save();
      response.status(201).json(subscribedUser);
    } else {
      next(new VerificationTokenExpiredException());
    }
  }
}

export default NotificationsController;
