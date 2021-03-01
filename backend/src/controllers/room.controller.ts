import * as express from 'express';
import mongoose from 'mongoose';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import RoomDto from '../dto/room.dto';
import roomModel from '../models/room.model';
import userModel from '../models/user.model'
import RoomNotFoundException from '../exceptions/RoomNotFoundException';
import User from '../interfaces/user.interface';

class RoomController implements Controller {
  public path = '/room';
  public router = express.Router();
  private room = roomModel;
  private user = userModel;

  constructor() {
    this.initializeRoutes();
    this.createInitialRooms();
  }

  private  createInitialRooms = async (): Promise<void> => {
    const defaultRooms = ['general', 'random'];
    defaultRooms.forEach(async (room) => {
      const currentRoom = await this.room.findOne({ name: room });
      if (!currentRoom) {
        await this.room.create({ name: room, users: [], messages: [] })
      }
    })
  }

  private initializeRoutes = (): void => {
    this.router.get(`${this.path}/get/:id`, authMiddleware, this.getRoom);
    this.router.post(`${this.path}/create`, authMiddleware, this.createRoom);
    this.router.get(`${this.path}/get-by-user/:id`, authMiddleware, this.getUserRooms);
  };

  private getRoom = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const id = request.params.id;
    const room = await this.room.findById(id);
    if (room) {
      response.json({ room });
    } else {
      next(new RoomNotFoundException());
    }
  };

  private createRoom = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const roomData: RoomDto = request.body;
    let currentRoom = await this.room.findOne(roomData);
    if (!currentRoom) {
      currentRoom = await this.room.create(roomData);
      const users = currentRoom.users
      users.forEach( async (user: User) => {
        const currentUser = await this.user.findById(user._id);
        currentUser.rooms = [...new Set([...currentUser.rooms, currentRoom])];
        await currentUser.save();
      })
    }
    response.json(currentRoom);
  };

  private getUserRooms = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const id = request.params.id;
    const rooms = await this.room.find({ users: { $elemMatch: {$eq: id} } });
    response.json({rooms});
  }
}

export default RoomController;
