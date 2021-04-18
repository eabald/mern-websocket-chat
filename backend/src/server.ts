// external;
import * as dotenv from 'dotenv';
// import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import path from 'path';
// controllers
import AppController from './controllers/app.controller';
// middleware
import logger from './middleware/logger.middleware';
// env validator
import EnvValidator from './validators/env.validator';

dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '../.env' : '.env',
});
EnvValidator(process.env);
const { PORT, MONGO_URI } = process.env;
const ROOT_PATH = path.join(__dirname, 'public');

const app = new AppController(Number(PORT), MONGO_URI, ROOT_PATH, [
  logger,
  cookieParser(),
  helmet(),
]);

app.listen();
