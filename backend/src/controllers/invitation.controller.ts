import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import invitationModel from '../models/invitation.model';
import authMiddleware from '../middleware/auth.middleware';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import MissingInvitationEmailException from '../exceptions/MissingInvitationEmailException';
import * as jwt from 'jsonwebtoken';
import TokenData from '../interfaces/token.interface';
import EmailService from '../services/email.service';
import userModel from './../models/user.model';
import RegistrationEmailException from '../exceptions/RegistrationEmailException';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import InvitationAlreadySentException from '../exceptions/InvitationAlreadySentException';
import NoInvitationsAvailableException from '../exceptions/NoInvitationsAvailableException';

class InvitationController implements Controller {
  public path = '/invitation';
  public router = express.Router();
  private invitation = invitationModel;
  private user = userModel;
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/send`, authMiddleware, this.sendInvitation);
  }

  private sendInvitation = async (
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const invitedBy = await this.user.findById(request.user._id);
    if (invitedBy.fomo.invitations < 1) {
      next(new NoInvitationsAvailableException());
    } else {
      const email = request.body.email;
      if (!email) {
        next(new MissingInvitationEmailException());
      } else {
        const user = await this.user.findOne({ email: { $eq: email } });
        if (user) {
          next(new UserWithThatEmailAlreadyExistsException(email));
        } else {
          const invitedUser = await this.invitation.findOne({
            email: { $eq: email },
          });
          if (invitedUser) {
            next(new InvitationAlreadySentException());
          } else {
            const { token } = this.createInvitationToken(email);
            const invitation = await this.invitation.create({
              email,
              token,
              invitedBy: request.user,
              timestamp: new Date(),
            });
            try {
              await this.emailService.sendEmail(
                email,
                request.t('Invitation to app'),
                process.env.EMAIL_TEMPLATE_INVITATION,
                {
                  appName: process.env.APP_NAME,
                  domain: process.env.DOMAIN,
                  header: request.t('Invite email header'),
                  mainText: request.t('Invite email content'),
                  ClickHereToRegister: request.t('Click here to register'),
                  urlInfo: request.t('Copy url info'),
                  registerUrl: `${process.env.DOMAIN}/register?token=${encodeURI(
                    token
                  )}`,
                  footerText: `© ${
                    process.env.APP_NAME
                  } ${new Date().getFullYear()}`,
                }
              );
              invitedBy.fomo.invitations = invitedBy.fomo.invitations - 1;
              await invitedBy.save();
              response.status(200).json({
                status: 'success',
                message: request.t('Invitation sent'),
                user: invitedBy,
              });
            } catch (error) {
              await invitation.deleteOne();
              console.log(error);
              next(new RegistrationEmailException());
            }
          }
        }
      }
    }
  };

  private createInvitationToken(email: string): TokenData {
    const expiresIn = 3600000 * 168;
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email }, secret, { expiresIn });
    return {
      expiresIn,
      token,
    };
  }
}

export default InvitationController;
