import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import userModel from '../models/user.model';

class UserController implements Controller {
  public path = '/user';
  public router = express.Router();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}/get`, authMiddleware, this.getUsers);
  }

  private getUsers = async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const users = await this.user.find({});
    response.json(users);
  };
}

export default UserController;
