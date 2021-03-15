import * as express from 'express';
import UpdateUserDto from '../dto/updateUser.dto';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import userModel from '../models/user.model';
import AuthenticationService from '../services/authentication.service';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';

class UserController implements Controller {
  public path = '/user';
  public router = express.Router();
  private user = userModel;
  private authService: AuthenticationService;

  constructor() {
    this.initializeRoutes();
    this.authService = new AuthenticationService();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}/get-all`, authMiddleware, this.getUsers);
    this.router.get(`${this.path}/get/:id`, authMiddleware, this.getUser);
    this.router.put(`${this.path}/update`, authMiddleware, this.updateUser);
    this.router.post(`${this.path}/find`, authMiddleware, this.findUser);
  }

  private getUsers = async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const users = await this.user.find();
    response.json({ users });
  };

  private getUser = async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const id = request.params.id;
    const user = await this.user.findById(id);
    response.json({ user });
  };

  private findUser = async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const query = request.body.query;
    const users = await this.user.find({ username: { $regex: query } });
    response.json({ users });
  }

  private updateUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const updateData: UpdateUserDto = request.body;
    const cookies = request.cookies;
    const user = await this.authService.findAndVerifyUser(cookies.Authorization);
    if (updateData._id !== user.id) {
      next(new AuthenticationTokenMissingException());
    } else {
      user.email = updateData.email;
      user.firstName = updateData.firstName;
      user.lastName = updateData.lastName;
      user.username = updateData.username;
      await user.save();
      response.json(user);
    }
  };
}

export default UserController;
