import express from 'express';
import { createServer, Server } from 'http';
import mongoose from 'mongoose';
import Controller from '../interfaces/controller.interface';

class AppController {
  public app: express.Application;
  public server: Server;
  public port: number;
  public middlewares: any[];
  public mongoUri: string;

  constructor(controllers: Controller[], port: number, mongoUri: string, middlewares: any[]) {
    this.app = express();
    this.server = createServer(this.app);
    this.port = port;
    this.middlewares = middlewares;
    this.mongoUri = mongoUri;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() : void {
    this.app.use(express.json());
    this.middlewares.forEach(middleware => this.app.use(middleware));
  }

  private initializeControllers(controllers: Controller[]) : void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private connectToTheDatabase() : void {
    mongoose.connect(
      `mongodb://${this.mongoUri}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
  }

  public listen() : void {
    this.server.listen(this.port, () => console.log(`App listening on the port ${this.port}`));
  }
}

export default AppController;
