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
import TokenData from '../interfaces/token.interface';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import roomModel from '../models/room.model';
import EmailService from '../services/email.service';
import RegistrationEmailException from '../exceptions/RegistrationEmailException';
import VerificationTokenExpiredException from '../exceptions/VerificationTokenExpiredException';
import DataStoredInVerificationToken from '../interfaces/dataStoredInVerificationToken';
import DataStoredInResetPasswordToken from '../interfaces/dataStoredInResetPasswordToken';
import EmailNotVerifiedException from '../exceptions/EmailNotVerifiedException';
import { v4 as uuidv4 } from 'uuid';
import passport from 'passport';
import { Strategy } from 'passport-local';
import InvitationTokenMissingException from '../exceptions/InvitationTokenMissingException';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();
  private user = userModel;
  private room = roomModel;
  private emailService: EmailService;

  constructor() {
    this.initializeRoutes();
    this.emailService = new EmailService();
    passport.use(
      new Strategy(
        {
          session: true,
        },
        this.getAuth
      )
    );
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((user, done) => {
      done(null, user);
    });
  }

  private getAuth = async (
    username: string,
    password: string,
    done: any
  ): Promise<void> => {
    const user = await this.user.findOne({ username });
    if (user) {
      if (!user.emailVerified) {
        return done(new EmailNotVerifiedException());
      }
      const isPasswordMatching = await bcrypt.compare(
        password,
        user.get('password', null, { getters: false })
      );
      if (isPasswordMatching) {
        user.password = undefined;
        return done(null, user);
      } else {
        return done(new WrongCredentialsException());
      }
    } else {
      return done(new WrongCredentialsException());
    }
  };

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
    this.router.get(`${this.path}/verify`, this.verifyEmail);
    this.router.post(`${this.path}/reset-password`, this.resetPasswordEmail);
    this.router.post(`${this.path}/change-password`, this.changePassword);
  }

  private createVerificationToken(email: string): TokenData {
    const expiresIn = 3600000 * 24;
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email }, secret, { expiresIn });
    return {
      expiresIn,
      token,
    };
  }

  private registration = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const invitationToken = request.params.token;
    if (!invitationToken) {
      next(new InvitationTokenMissingException());
    } else {
      try {
        const { email } = jwt.verify(
          invitationToken,
          process.env.JWT_SECRET
        ) as DataStoredInVerificationToken;
        const userData: CreateUserDto = request.body;
        if (await this.user.findOne({ email: { $eq: email } })) {
          next(new UserWithThatEmailAlreadyExistsException(email));
        } else if (
          await this.user.findOne({ username: { $eq: userData.username } })
        ) {
          next(
            new UserWithThatUsernameAlreadyExistsException(userData.username)
          );
        } else {
          const hashedPassword = await bcrypt.hash(userData.password, 10);
          const defaultRooms = await this.room.find({
            $or: [{ name: 'general' }, { name: 'random' }],
          });
          const { token } = this.createVerificationToken(email);
          const user = await this.user.create({
            ...userData,
            password: hashedPassword,
            rooms: defaultRooms,
            verificationToken: token,
          });
          defaultRooms.forEach(async (room) => {
            room.users.push(user._id);
            await room.save();
          });
          try {
            await this.emailService.sendEmail(
              user.email,
              request.t('Email verification'),
              process.env.EMAIL_TEMPLATE_EMAIL_VERIFICATION,
              {
                appName: process.env.APP_NAME,
                domain: process.env.DOMAIN,
                header: request.t('Verify email header'),
                target: user.firstName,
                mainText: request.t('Verify email content'),
                ClickHereToVerify: request.t('Click here to verify'),
                urlInfo: request.t('Copy url info'),
                verifyUrl: `${process.env.DOMAIN}/verify?token=${encodeURI(
                  token
                )}`,
                footerText: `© ${
                  process.env.APP_NAME
                } ${new Date().getFullYear()}`,
              }
            );
            response.json({
              status: 'success',
              message: request.t(
                'Registration complete, check your inbox for verification email.'
              ),
            });
          } catch (error) {
            await user.deleteOne();
            console.log(error);
            next(new RegistrationEmailException());
          }
        }
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          next(new VerificationTokenExpiredException());
        } else {
          next(new InternalServerErrorException());
        }
      }
    }
  };

  private verifyEmail = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const token = String(request.query.token);
    try {
      if (!token) {
        next(new AuthenticationTokenMissingException());
      } else {
        const { email } = jwt.verify(
          token,
          process.env.JWT_SECRET
        ) as DataStoredInVerificationToken;
        const user = await this.user.findOne({ email });
        if (!user) {
          next(new WrongCredentialsException());
        } else {
          if (user.verificationToken === '') {
            response.json({
              status: 'success',
              message: request.t('Already verified, you can sign in now.'),
            });
          } else {
            user.verificationToken = '';
            user.emailVerified = true;
            await user.save();
            response.json({
              status: 'success',
              message: request.t('Email verified, you can sign in now.'),
            });
          }
        }
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        next(new VerificationTokenExpiredException());
      } else {
        next(new InternalServerErrorException());
      }
    }
  };

  private resetPasswordEmail = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const { email } = request.body;
    try {
      if (!email) {
        next(new WrongCredentialsException());
      } else {
        const user = await this.user.findOne({ email: { $eq: email } });
        if (!user) {
          next(new WrongCredentialsException());
        } else {
          const resetToken = uuidv4();
          const token = jwt.sign({ email, resetToken }, process.env.JWT_SECRET);
          user.resetToken = resetToken;
          await user.save();
          await this.emailService.sendEmail(
            user.email,
            request.t('Reset password'),
            process.env.EMAIL_TEMPLATE_RESET_PASSWORD,
            {
              appName: process.env.APP_NAME,
              domain: process.env.DOMAIN,
              header: request.t('Verify email header'),
              target: user.firstName,
              mainText: request.t('Reset email content'),
              ClickHereToReset: request.t('Click here to Reset'),
              urlInfo: request.t('Copy url info'),
              verifyUrl: `${
                process.env.DOMAIN
              }/change-password?token=${encodeURI(token)}`,
              footerText: `© ${
                process.env.APP_NAME
              } ${new Date().getFullYear()}`,
            }
          );
          response.json({
            status: 'success',
            message: request.t(
              'Reset password message sent, check your inbox for verification email.'
            ),
          });
        }
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        next(new VerificationTokenExpiredException());
      } else {
        next(new InternalServerErrorException());
      }
    }
  };

  private changePassword = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const { password, token } = request.body;
    if (!password || !token) {
      next(new WrongCredentialsException());
    } else {
      try {
        const { email, resetToken } = jwt.verify(
          token,
          process.env.JWT_SECRET
        ) as DataStoredInResetPasswordToken;
        const user = await this.user.findOne({ email, resetToken });
        if (!user) {
          next(new WrongCredentialsException());
        } else {
          user.resetToken = '';
          const hashedPassword = await bcrypt.hash(password, 10);
          user.password = hashedPassword;
          user.save();
          response.json({
            status: 'success',
            message: request.t(
              'Password reset complete, you can log in now using new password.'
            ),
          });
        }
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          next(new VerificationTokenExpiredException());
        } else {
          next(new InternalServerErrorException());
        }
      }
    }
  };

  private loggingIn = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        next(err);
      } else {
        request.login(user, () =>
          response.json({ user, token: request.sessionID })
        );
      }
    })(request, response, next);
  };

  private loggingOut = (
    request: express.Request,
    response: express.Response
  ): void => {
    request.logout();
    response.clearCookie('connect.sid');
    response.json({ status: 200 });
  };
}

export default AuthenticationController;
