// external;
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
// controllers
import AppController from './controllers/app.controller';
import AuthenticationController from './controllers/authentication.controller';
import RoomController from './controllers/room.controller';
import MessageController from './controllers/message.controller';
import UserController from './controllers/user.controller';
// middleware
import logger from './middleware/logger.middleware';
import errorMiddleware from './middleware/error.middleware';
// env validator
import EnvValidator from './validators/env.validator';

dotenv.config({ path: '../.env' });
EnvValidator(process.env);
const { BACKEND_PORT, MONGO_URI } = process.env;

const authenticationController = new AuthenticationController();
const roomController = new RoomController();
const messageController = new MessageController();
const userController = new UserController();

const app = new AppController(
  [authenticationController, roomController, messageController, userController],
  Number(BACKEND_PORT),
  MONGO_URI,
  [logger, cors(), cookieParser(), helmet(), errorMiddleware]
);

app.listen();
messageController.initializeWebsocket(app.server);
