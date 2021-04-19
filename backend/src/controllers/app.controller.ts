import express, { RequestHandler } from 'express';
import errorMiddleware from '../middleware/error.middleware';
import { createServer, Server } from 'http';
import mongoose from 'mongoose';
import Controller from '../interfaces/controller.interface';
import ErrorLogger from '../middleware/errorLogger.middleware';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { createClient, RedisClient } from 'redis';
import passport from 'passport';
import i18next from 'i18next'
import { handle as i18nHandle, LanguageDetector } from 'i18next-http-middleware'
// controllers
import AuthenticationController from './authentication.controller';
import RoomController from './room.controller';
import MessageController from './message.controller';
import UserController from './user.controller';

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
    const RedisStore = connectRedis(session);
    this.redisClient = createClient({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      auth_pass: process.env.REDIS_PASSWORD,
      no_ready_check: true,
    });
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET,
        store: new RedisStore({
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

  private initializeControllers(): void {
    const controllers = [
      new AuthenticationController(),
      new RoomController(),
      new MessageController(this.server, this.redisClient),
      new UserController(),
    ];
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
  private initializePassportSession(): void {
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private initializeI18N(): void {
    i18next
      .use(LanguageDetector)
      .init({
        debug: process.env.NODE_ENV !== 'production',
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
        resources: {
          en: {
            translation: {
              'Registration complete, check your inbox for verification email.': 'Registration complete, check your inbox for verification email.',
              'Already verified, you can sign in now.': 'Already verified, you can sign in now.',
              'Email verified, you can sign in now.': 'Email verified, you can sign in now.',
              'Reset password message sent, check your inbox for verification email.': 'Reset password message sent, check your inbox for verification email.',
              'Password reset complete, you can log in now using new password.': 'Password reset complete, you can log in now using new password.',
              'Sending message to this user has been blocked.': 'Sending message to this user has been blocked.',
              'User blocked': 'User blocked',
              'Something went wrong': 'Something went wrong',
              'Verification email expired, sending new one.': 'Verification email expired, sending new one.',
              'Authentication token missing': 'Authentication token missing',
              'Email not verified, check your inbox for verification email.': 'Email not verified, check your inbox for verification email.',
              'Internal server error.': 'Internal server error.',
              'Unable to send verification email, try again later.': 'Unable to send verification email, try again later.',
              'Room not found': 'Room not found',
              'User with email {{email}} already exists': 'User with email {{email}} already exists',
              'User with username {{username}} already exists': 'User with username {{username}} already exists',
              'Authentication token expired': 'Authentication token expired',
              'Wrong credentials provided': 'Wrong credentials provided',
            },
          },
          pl: {
            translation: {
              'Registration complete, check your inbox for verification email.': 'Rejestracja zakończona, sprawdź swoją skrzynkę odbiorczą pod kątem e-maila weryfikacyjnego.',
              'Already verified, you can sign in now.': 'Adres email został już zweryfikowany, możesz się teraz zalogować.',
              'Email verified, you can sign in now.': 'Adres e-mail zweryfikowany, możesz się teraz zalogować.',
              'Reset password message sent, check your inbox for verification email.': 'Wysłano wiadomość dotyczącą resetowania hasła. Sprawdź swoją skrzynkę odbiorczą, aby uzyskać e-mail weryfikacyjny.',
              'Password reset complete, you can log in now using new password.': 'Resetowanie hasła zakończone, możesz się teraz zalogować przy użyciu nowego hasła.',
              'Sending message to this user has been blocked.': 'Wysyłanie wiadomości do tego użytkownika zostało zablokowane.',
              'User blocked': 'Użytkownik zablokowany',
              'Something went wrong': 'Coś poszło nie tak.',
              'Verification email expired, sending new one.': 'E-mail weryfikacyjny wygasł, wysłano nowy.',
              'Authentication token missing': 'Brak tokena uwierzytelniającego',
              'Email not verified, check your inbox for verification email.': 'Adres e-mail niezweryfikowany, sprawdź swoją skrzynkę odbiorczą pod kątem e-maila weryfikacyjnego.',
              'Internal server error.': 'Wewnętrzny błąd serwera.',
              'Unable to send verification email, try again later.': 'Nie można wysłać e-maila weryfikacyjnego, spróbuj ponownie później.',
              'Room not found': 'Pokoju nie znaleziono',
              'User with email {{email}} already exists': 'Użytkownik z adresem e-mail {{email}} już istnieje',
              'User with username {{username}} already exists': 'Użytkownik o nazwie użytkownika {{username}} już istnieje',
              'Authentication token expired': 'Ważność tokena uwierzytelniającego wygasła',
              'Wrong credentials provided': 'Podano nieprawidłowe dane logowania',
            },
          },
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
