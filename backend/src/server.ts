// externa;
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet'
// controllers
import AppController from './controllers/app.controller';
import AuthenticationController from './controllers/authentication.controller';
import RoomController from './controllers/room.controller';
import MessageController from './controllers/message.controller';
// middleware
import logger from './middleware/logger.middleware';
import errorMiddleware from './middleware/error.middleware';
// env validator
import EnvValidator from './validators/env.validator';

dotenv.config({ path: '../.env' });
EnvValidator(process.env);
const {
  BACKEND_PORT,
  MONGO_URI,
} = process.env;

const app = new AppController(
  [
    new AuthenticationController(),
    new RoomController(),
    new MessageController(),
  ],
  Number(BACKEND_PORT),
  MONGO_URI,
  [logger, cors(), cookieParser(), helmet(), errorMiddleware]
);

app.listen();
