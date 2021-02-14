// externa;
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// controllers
import AppController from './controllers/app.controller';
import AuthenticationController from './controllers/authentication.controller';
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
  [new AuthenticationController()],
  BACKEND_PORT,
  MONGO_URI,
  [logger, cors(), errorMiddleware, cookieParser()]
);

app.listen();
