// external;
import * as dotenv from 'dotenv';
// import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import path from 'path';
// controllers
import AppController from './controllers/app.controller';
import AuthenticationController from './controllers/authentication.controller';
import RoomController from './controllers/room.controller';
import MessageController from './controllers/message.controller';
import UserController from './controllers/user.controller';
// middleware
import logger from './middleware/logger.middleware';
// env validator
import EnvValidator from './validators/env.validator';

dotenv.config({ path: process.env.NODE_ENV === 'development' ? '../.env' : '.env' });
EnvValidator(process.env);
const { BACKEND_PORT, MONGO_URI } = process.env;
const ROOT_PATH = path.join(__dirname, 'public');

const authenticationController = new AuthenticationController();
const roomController = new RoomController();
const messageController = new MessageController();
const userController = new UserController();

const app = new AppController(
  [authenticationController, roomController, messageController, userController],
  Number(BACKEND_PORT),
  MONGO_URI,
  ROOT_PATH,
  [logger, cookieParser(), helmet()]
);

app.listen();
messageController.initializeWebsocket(app.server);
