import express from 'express';
import mongoose from 'mongoose';
import Controller from '../interfaces/controller.interface';

class AppController {
  public app: express.Application;
  public port: number;
  public middlewares: any[];
  public mongoUri: string;

  constructor(controllers: Controller[], port, mongoUri, middlewares) {
    this.app = express();
    this.port = port;
    this.middlewares = middlewares;
    this.mongoUri = mongoUri;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.middlewares.forEach(middleware => this.app.use(middleware));
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private connectToTheDatabase() {
    mongoose.connect(
      `mongodb://${this.mongoUri}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
  }

  public listen() {
    this.app.listen(this.port, () => console.log(`App listening on the port ${this.port}`));
  }
}

export default AppController;
