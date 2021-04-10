import express, { RequestHandler } from 'express';
import errorMiddleware from '../middleware/error.middleware';
import { createServer, Server } from 'http';
import mongoose from 'mongoose';
import Controller from '../interfaces/controller.interface';
import ErrorLogger from '../middleware/errorLogger.middleware';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { RedisClient } from 'redis';

class AppController {
  public app: express.Application;
  public server: Server;
  public port: number;
  public middlewares: RequestHandler[];
  public mongoUri: string;
  private static: string;

  constructor(
    controllers: Controller[],
    port: number,
    mongoUri: string,
    staticPath: string,
    middlewares: RequestHandler[]
  ) {
    this.app = express();
    this.server = createServer(this.app);
    this.port = port;
    this.middlewares = middlewares;
    this.mongoUri = mongoUri;
    this.static = staticPath;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeSession();
    this.initializeControllers(controllers);
    this.initializeStatic();
    this.initializeErrorMiddleware();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.middlewares.forEach((middleware) => this.app.use(middleware));
  }

  private initializeSession(): void {
    const RedisStore = connectRedis(session);
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET,
        store: new RedisStore({
          client: new RedisClient({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
          }),
          disableTouch: true,
        }),
        cookie: {},
        resave: false,
        saveUninitialized: false,
      })
    );
  }

  private initializeErrorMiddleware(): void {
    this.app.use(ErrorLogger);
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }

  private initializeStatic(): void {
    this.app.use(express.static(this.static));
    this.app.get('*', (request: express.Request, response: express.Response) =>
      response.sendFile('index.html', { root: this.static })
    );
  }

  private connectToTheDatabase(): void {
    mongoose.connect(`mongodb://${this.mongoUri}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public listen(): void {
    this.server.listen(this.port, () =>
      console.log(`App listening on the port ${this.port}`)
    );
  }
}

export default AppController;
