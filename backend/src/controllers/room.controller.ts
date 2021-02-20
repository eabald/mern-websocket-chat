import * as express from 'express';
import mongoose from 'mongoose';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import RoomDto from '../dto/room.dto';
import roomModel from '../models/room.model';
import RoomNotFoundException from '../exceptions/RoomNotFoundException';

class RoomController implements Controller {
  public path = '/room';
  public router = express.Router();
  private room = roomModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.get(`${this.path}/:id`, authMiddleware, this.getRoom);
    this.router.post(`${this.path}/create`, authMiddleware, this.createRoom);
  };

  private getRoom = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const id = request.params.id;
    if (mongoose.Types.ObjectId.isValid(id.toString())) {
      const room = await this.room.findById(id);
      if (room) {
        response.json(room);
      } else {
        next(new RoomNotFoundException());
      }
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
    }
    response.json(currentRoom);
  };
}

export default RoomController;
