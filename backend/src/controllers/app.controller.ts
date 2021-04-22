import express, { RequestHandler } from 'express';
import errorMiddleware from '../middleware/error.middleware';
import { createServer, Server } from 'http';
import mongoose from 'mongoose';
import ErrorLogger from '../middleware/errorLogger.middleware';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { createClient, RedisClient } from 'redis';
import passport from 'passport';
import i18next from 'i18next'
import { handle as i18nHandle, LanguageDetector } from 'i18next-http-middleware'
import Backend from 'i18next-fs-backend';
import { join } from 'path';
import isValidPath from 'is-valid-path';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis'
// controllers
import AuthenticationController from './authentication.controller';
import RoomController from './room.controller';
import MessageController from './message.controller';
import UserController from './user.controller';
import LocaleController from './locale.controller';

class AppController {
  public app: express.Application;
  public server: Server;
  public port: number;
  public middlewares: RequestHandler[];
  public mongoUri: string;
  private static: string;
  public redisClient: RedisClient;

  constructor(
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
    this.initializePassportSession();
    this.initializeI18N();
    this.initializeLimiter();
    this.initializeControllers();
    this.initializeStatic();
    this.initializeErrorMiddleware();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.middlewares.forEach((middleware) => this.app.use(middleware));
  }

  private initializeSession(): void {
    const RedisSessionStore = connectRedis(session);
    this.redisClient = createClient({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      auth_pass: process.env.REDIS_PASSWORD,
      no_ready_check: true,
    });
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET,
        store: new RedisSessionStore({
          client: this.redisClient,
          disableTouch: true,
        }),
        resave: false,
        saveUninitialized: false,
      })
    );
  }

  private initializeErrorMiddleware(): void {
    this.app.use(ErrorLogger);
    this.app.use(errorMiddleware);
  }

  private initializeLimiter(): void {
    const limiter = rateLimit({
      store: new RedisStore({
        client: this.redisClient
      }),
      windowMs: 1000,
      max: 20,
    });
    this.app.use(limiter);
  }

  private initializeControllers(): void {
    const controllers = [
      new AuthenticationController(),
      new RoomController(),
      new MessageController(this.server, this.redisClient),
      new UserController(),
      new LocaleController(),
    ];
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }

  private initializeStatic(): void {
    this.app.use(express.static(this.static));
    this.app.get('*', (request: express.Request, response: express.Response) => {
      if (isValidPath(request.path)) {
        response.sendFile('index.html', { root: this.static });
      }
    });
  }
  private initializePassportSession(): void {
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private initializeI18N(): void {
    i18next
      .use(LanguageDetector)
      .use(Backend)
      .init({
        debug: process.env.NODE_ENV !== 'production',
        fallbackLng: 'en',
        preload: ['en', 'pl'],
        ns: ['translation'],
        defaultNS: 'translation',
        interpolation: {
          escapeValue: false,
        },
        backend: {
          loadPath: join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
        },
      });
    this.app.use(i18nHandle(i18next));
  }

  private connectToTheDatabase(): void {
    mongoose.connect(this.mongoUri, {
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
