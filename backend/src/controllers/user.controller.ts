import * as express from 'express';
import UpdateUserDto from '../dto/updateUser.dto';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import userModel from '../models/user.model';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import RequestWithUser from '../interfaces/requestWithUser.interface';

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
    this.router.put(`${this.path}/update`, authMiddleware, this.updateUser);
    this.router.post(`${this.path}/find`, authMiddleware, this.findUser);
    this.router.post(`${this.path}/update-unread/:id`, authMiddleware, this.updateUnread);
    this.router.post(`${this.path}/block/:id`, authMiddleware, this.blockUser);
  }

  private getUsers = async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const users = await this.user.find();
    response.json({ users });
  };

  private getUser = async (
    request: RequestWithUser,
    response: express.Response
  ): Promise<void> => {
    const id = request.params.id;
    const user = await this.user.findById(id);
    if (request.user.id !== id) {
      user.email = undefined;
    }
    response.json({ user });
  };

  private findUser = async (
    request: RequestWithUser,
    response: express.Response
  ): Promise<void> => {
    const query = request.body.query;
    const users = await this.user.find({ username: { $regex: query }, _id: { $nin: request.user.blockedBy } });
    response.json({ users });
  }

  private updateUser = async (
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const updateData: UpdateUserDto = request.body;
    const cookies = request.cookies;
    const user = await this.user.findById(request.user.id)
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

  private updateUnread = async (
    request: RequestWithUser,
    response: express.Response,
  ): Promise<void> => {
    const userId = request.user.id;
    const roomId = request.params.id;
    const user = await this.user.findById(userId);
    user.unread = user.unread.filter(unread => unread._id.toString() !== roomId);
    await user.save();
    response.json({ state: 'success' });
  }

  private blockUser = async (
    request: RequestWithUser,
    response: express.Response,
  ): Promise<void> => {
    const blockedById = request.user.id;
    const userId = request.params.id;
    const user = await this.user.findById(userId);
    const blockedBy = await this.user.findById(blockedById);
    user.blockedBy.push(blockedBy);
    await user.save();
    response.json({ status: { state: 'success', message: request.t('User blocked') } });
  }
}

export default UserController;
