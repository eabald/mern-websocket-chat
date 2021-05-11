import Controller from '../interfaces/controller.interface';
import * as express from 'express';
import userModel from './../models/user.model';
import authMiddleware from '../middleware/auth.middleware';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import Stripe from 'stripe';
import PaymentNotFulfilledException from '../exceptions/PaymentNotFulfilledException';
import PriceData from '../interfaces/priceData.interface';
import PaymentFailedException from '../exceptions/PaymentFailedException';
import paymentModel from '../models/payment.model';
import { RedisClient } from 'redis';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import EmailService from '../services/email.service';
import User from '../interfaces/user.interface';

class PaymentController implements Controller {
  public path = '/payment';
  public router = express.Router();
  private user = userModel;
  private payment = paymentModel;
  private pubClient: RedisClient;
  private stripe: Stripe;
  private emailService: EmailService;

  constructor(redisClient: RedisClient) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
    this.pubClient = redisClient;
    this.emailService = new EmailService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/buy-invitations`,
      authMiddleware,
      this.buyInvitations
    );
    this.router.post(
      `${this.path}/buy-invitations-status`,
      authMiddleware,
      this.buyInvitationsStatus
    );
    this.router.post(`${this.path}/buy-rooms`, authMiddleware, this.buyRooms);
    this.router.post(
      `${this.path}/buy-rooms-status`,
      authMiddleware,
      this.buyRoomsStatus
    );
    this.router.post(`${this.path}/buy-registration`, this.buyRegistration);
    this.router.post(
      `${this.path}/buy-registration-status`,
      this.buyRegistrationStatus
    );
  }

  private createCheckoutSession(
    request: RequestWithUser,
    priceData: PriceData,
    path: string
  ) {
    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        createdAt: Date.now(),
      },
      success_url: `${process.env.DOMAIN}/${path}?payed=true`,
      cancel_url: `${process.env.DOMAIN}/${path}?error=true`,
    });
  }

  private verifyPaymentAndProcess = async (
    id: string,
    userId: string,
    field: string,
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction,
    emailContent: { [x: string]: string },
    customCallback?: (id: string) => void
  ) => {
    if (!id) {
      next(new PaymentFailedException());
    } else {
      const payment = await this.payment.findOne({ sessionId: { $eq: id } });
      if (!payment) {
        next(new PaymentFailedException());
      } else {
        const session = await this.stripe.checkout.sessions.retrieve(id);
        payment.status = session.payment_status;
        payment.save();
        const isPayed = session.payment_status === 'paid';
        if (isPayed) {
          let user: User;
          const message = request.t('Payment successful, check your email.');
          if (userId) {
            user = await this.user.findById(userId);
            user.fomo[field] = user.fomo[field] + 3;
            await user.save();
            response.status(200).json({ status: 'success', message, user });
          } else if (customCallback) {
            customCallback(id);
            response.status(200).json({ status: 'success', message });
          }
          this.paymentConfirmationEmail(userId ? user.email : payment.additionalData.email, emailContent);
        } else {
          if (
            !request.session.watchingPayments ||
            !request.session.watchingPayments.includes(id)
          ) {
            if (!request.session.watchingPayments) {
              request.session.watchingPayments = [id];
            } else {
              request.session.watchingPayments.push(id);
            }
            this.watchPaymentStatus(
              id,
              userId,
              field,
              emailContent ?? {},
              customCallback
            );
          }
          next(new PaymentNotFulfilledException());
        }
      }
    }
  };

  private watchPaymentStatus = async (
    sessionId: string,
    userId: string,
    field: string,
    emailContent: { [x: string]: string },
    customCallback?: (id: string) => void
  ): Promise<void> => {
    setTimeout(async () => {
      const payment = await this.payment.findOne({
        sessionId: { $eq: sessionId },
      });
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      payment.status = session.payment_status;
      payment.save();
      const isPayed = session.payment_status === 'paid';
      if (isPayed) {
        let user: User;
        if (userId) {
          user = await this.user.findById(userId);
          user.fomo[field] = user.fomo[field] + 3;
          await user.save();
          const successMessage = {
            type: 'success',
            userId,
            payment: payment.id,
          };
          this.pubClient.publish('payments', JSON.stringify(successMessage));
        } else if (customCallback) {
          customCallback(sessionId);
        }
        this.paymentConfirmationEmail(userId ? user.email : payment.additionalData.email, emailContent);
      } else {
        const abandoned =
          Number(session.metadata.createdAt) + 36000000 < Date.now();
        if (abandoned) {
          await this.stripe.paymentIntents.cancel(
            session.payment_intent.toString()
          );
          await payment.deleteOne();
        } else {
          if (!customCallback) {
            const status = await (
              await this.stripe.paymentIntents.retrieve(
                session.payment_intent.toString()
              )
            ).status;
            if (status !== 'processing') {
              const continuePaymentMessage = {
                type: 'processing',
                userId,
                payment: sessionId,
              };
              this.pubClient.publish(
                'payments',
                JSON.stringify(continuePaymentMessage)
              );
            }
          }
          this.watchPaymentStatus(
            sessionId,
            userId,
            field,
            emailContent,
            customCallback
          );
        }
      }
    }, 60000);
  };

  private paymentConfirmationEmail = async (
    email,
    emailContent: { [x: string]: string }
  ) => {
    try {
      await this.emailService.sendEmail(
        email,
        emailContent.subject,
        process.env.EMAIL_PAYMENT_CONFIRMATION,
        emailContent
      );
    } catch (error) {
      console.log(error);
    }
  };

  private generateEmailContent = (request: express.Request, type: string): {[x: string]: string} => {
    return {
      appName: process.env.APP_NAME,
      domain: process.env.DOMAIN,
      header: request.t('Payment email header'),
      mainText: request.t(type),
      BackToApp: request.t('back to app'),
      footerText: `© ${process.env.APP_NAME} ${new Date().getFullYear()}`,
    };
  }

  private buyInvitations = async (
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const session = await this.createCheckoutSession(
      request,
      {
        currency: 'usd',
        product_data: {
          name: 'Invitations',
        },
        unit_amount: 499,
      },
      `modal/${request.t('invite-user')}`
    );
    const currentUser = await this.user.findById(request.user._id);
    const payment = await this.payment.create({
      sessionId: session.id,
      value: 4.99,
      status: 'unpaid',
      type: 'invitations',
      user: request.user,
    });
    currentUser.payments = [...currentUser.payments, payment];
    await currentUser.save();
    response.status(200).json({ id: session.id });
  };

  private buyInvitationsStatus = async (
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const sessionId = request.body.id;
    await this.verifyPaymentAndProcess(
      sessionId,
      request.user._id,
      'invitations',
      request,
      response,
      next,
      this.generateEmailContent(request, 'invitation payment success info')
    );
  };

  private buyRooms = async (
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const session = await this.createCheckoutSession(
      request,
      {
        currency: 'usd',
        product_data: {
          name: 'Rooms',
        },
        unit_amount: 499,
      },
      `modal/${request.t('add-new-room')}`
    );
    const currentUser = await this.user.findById(request.user._id);
    const payment = await this.payment.create({
      sessionId: session.id,
      value: 4.99,
      status: 'unpaid',
      type: 'rooms',
      user: request.user,
    });
    currentUser.payments = [...currentUser.payments, payment];
    await currentUser.save();
    response.status(200).json({ id: session.id });
  };

  private buyRoomsStatus = async (
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const sessionId = request.body.id;
    await this.verifyPaymentAndProcess(
      sessionId,
      request.user._id,
      'roomsLimit',
      request,
      response,
      next,
      this.generateEmailContent(request, 'rooms payment success info')
    );
  };

  private buyRegistration = async (
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const credentials = request.body;
    const user = await this.user.findOne({ email: { $eq: credentials.email } });
    if (user) {
      next(new UserWithThatEmailAlreadyExistsException(credentials.email));
    } else {
      const session = await this.createCheckoutSession(
        request,
        {
          currency: 'usd',
          product_data: {
            name: 'Registration',
          },
          unit_amount: 499,
        },
        `${request.t('buy-registration')}`
      );
      await this.payment.create({
        sessionId: session.id,
        value: 4.99,
        status: 'unpaid',
        type: 'registration',
        additionalData: credentials,
      });
      response.status(200).json({ id: session.id });
    }
  };

  private buyRegistrationStatus = async (
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const sessionId = request.body.id;
    await this.verifyPaymentAndProcess(
      sessionId,
      '',
      'registration',
      request,
      response,
      next,
      this.generateEmailContent(request, 'registration payment success info'),
      (id: string) => {
        const emailContent = {
          subject: request.t('Invitation to app'),
          appName: process.env.APP_NAME,
          domain: process.env.DOMAIN,
          header: request.t('Invite email header'),
          mainText: request.t('Invite email content'),
          ClickHereToRegister: request.t('Click here to register'),
          urlInfo: request.t('Copy url info'),
          footerText: `© ${process.env.APP_NAME} ${new Date().getFullYear()}`,
        };
        console.log('here');
        this.pubClient.publish(
          'invitations',
          JSON.stringify({ id, emailContent })
        );
      }
    );
  };
}
export default PaymentController;
