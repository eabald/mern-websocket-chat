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
import refreshTokenModel from '../models/refreshToken.model';
import LogInDto from '../dto/logIn.dto';
import User from '../interfaces/user.interface';
import TokenData from '../interfaces/token.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import AuthenticationService from '../services/authentication.service';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import RefreshTokenDto from '../dto/refreshToken.dto';
import roomModel from '../models/room.model';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();
  private user = userModel;
  private refreshToken = refreshTokenModel;
  private room = roomModel;
  private authService: AuthenticationService;

  constructor() {
    this.initializeRoutes();
    this.authService = new AuthenticationService();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.registration
    );
    this.router.post(
      `${this.path}/refresh-token`,
      validationMiddleware(RefreshTokenDto),
      this.refreshCookie
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.loggingIn
    );
    this.router.post(`${this.path}/logout`, this.loggingOut);
  }

  private createToken(user: User): TokenData {
    const expiresIn = 3600000;
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  private async createRefreshToken(user: User): Promise<TokenData> {
    const expiresIn = 3600000 * 24;
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    const token = await this.refreshToken.create({
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    });
    return {
      expiresIn,
      token: token.token,
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
      const defaultRooms = await this.room.find({ $or: [{ name: 'general' }, { name: 'random' }]})
      const user = await this.user.create({
        ...userData,
        password: hashedPassword,
        rooms: defaultRooms,
      });
      defaultRooms.forEach(async (room) => {
        room.users.push(user);
        await room.save();
      })
      user.password = undefined;
      const { token, expiresIn } = this.createToken(user);
      const refreshToken = await this.createRefreshToken(user);
      response.cookie('Authorization', token, {
        maxAge: expiresIn,
        httpOnly: true,
      });
      response.json({ token, user, refreshToken: refreshToken.token });
    }
  };

  private refreshCookie = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    try {
      const { refreshToken } = request.body;
      if (!refreshToken) {
        next(new AuthenticationTokenMissingException());
      } else {
        const tokenDoc = await this.refreshToken.findOne({ token: refreshToken });
        if (!tokenDoc) {
          next(new WrongAuthenticationTokenException());
        } else {
          const user = await this.authService.findAndVerifyUser(tokenDoc.token);
          const { token, expiresIn } = this.createToken(user);
          response.cookie('Authorization', token, {
            maxAge: expiresIn * 24,
            httpOnly: true,
          });
          response.json({ token, user, refreshToken: tokenDoc.token });
        }
      }
    } catch (error) {
      console.error(error);
      next(new InternalServerErrorException());
    }
  }

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
        const { token, expiresIn } = this.createToken(user);
        const refreshToken = await this.createRefreshToken(user);
        response.cookie('Authorization', token, {
          maxAge: expiresIn * 24,
          httpOnly: true,
        });
        response.json({ token, user, refreshToken: refreshToken.token });
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
    response.clearCookie('Authorization');
    response.json({ status: 200 });
  };
}

export default AuthenticationController;
