import express from 'express';
import path from 'path';
import { createServer, Server } from 'http';
import mongoose from 'mongoose';
import Controller from '../interfaces/controller.interface';

class AppController {
  public app: express.Application;
  public server: Server;
  public port: number;
  public middlewares: any[];
  public mongoUri: string;
  private static: string;

  constructor(
    controllers: Controller[],
    port: number,
    mongoUri: string,
    staticPath: string,
    middlewares: any[],
  ) {
    this.app = express();
    this.server = createServer(this.app);
    this.port = port;
    this.middlewares = middlewares;
    this.mongoUri = mongoUri;
    this.static = staticPath;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeStatic();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.middlewares.forEach((middleware) => this.app.use(middleware));
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }

  private initializeStatic(): void {
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
