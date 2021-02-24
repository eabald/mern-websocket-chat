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
    this.router.get(`${this.path}/get-all`, authMiddleware, this.getUsers);
    this.router.get(`${this.path}/get/:id`, authMiddleware, this.getUser);
  }

  private getUsers = async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const users = await this.user.find({});
    response.json(users);
  };

  private getUser = async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const id = request.params.id;
    const user = await this.user.findById(id);
    response.json(user);
  };
}

export default UserController;
