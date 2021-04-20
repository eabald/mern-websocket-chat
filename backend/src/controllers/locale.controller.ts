import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import { promises } from 'fs';
import { join } from 'path';

class LocaleController implements Controller {
  public path = '/locale';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}/:lng/:ns`, this.getLocale);
  }

  private getLocale = async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const { lng, ns } = request.params;
    let locale = await promises.readFile(
      join(__dirname, `../locales/${lng}/${ns}.json`),
    );
    locale = JSON.parse(locale.toString());
    console.log(locale);
    response.json({ ...locale });
  };
}

export default LocaleController;
