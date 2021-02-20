import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import UserWithThatUsernameAlreadyExistsException from '../exceptions/UserWithThatUsernameAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../dto/user.dto';
import userModel from './../models/user.model';
import LogInDto from '../dto/logIn.dto';
import User from '../interfaces/user.interface';
import TokenData from '../interfaces/token.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.registration
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.loggingIn
    );
    this.router.post(`${this.path}/logout`, this.loggingOut);
  }

  private createToken(user: User): TokenData {
    const expiresIn = 60 * 60;
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  private registration = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const userData: CreateUserDto = request.body;
    if (await this.user.findOne({ email: userData.email })) {
      next(new UserWithThatEmailAlreadyExistsException(userData.email));
    } else if (await this.user.findOne({ username: userData.username })) {
      next(new UserWithThatUsernameAlreadyExistsException(userData.username));
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await this.user.create({
        ...userData,
        password: hashedPassword,
      });
      user.password = undefined;
      const tokenData = this.createToken(user);
      response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
      const { token } = tokenData;
      response.json({ token, user });
    }
  };

  private loggingIn = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const logInData: LogInDto = request.body;
    const user = await this.user.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.get('password', null, { getters: false })
      );
      if (isPasswordMatching) {
        user.password = undefined;
        const tokenData = this.createToken(user);
        const { token } = tokenData;
        response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        response.json({ token, user });
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };

  private loggingOut = (
    request: express.Request,
    response: express.Response
  ): void => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.json({ status: 200 });
  };

  private createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}

export default AuthenticationController;
