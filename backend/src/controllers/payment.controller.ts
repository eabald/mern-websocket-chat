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

class PaymentController implements Controller {
  public path = '/payment';
  public router = express.Router();
  private user = userModel;
  private payment = paymentModel;
  private pubClient: RedisClient;
  private stripe: Stripe;

  constructor(redisClient: RedisClient) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
    this.pubClient = redisClient;
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
      success_url: `${process.env.DOMAIN}/${request.t(path)}?payed=true`,
      cancel_url: `${process.env.DOMAIN}/${request.t(path)}?error=true`,
    });
  }

  private verifyPaymentAndProcess = async (
    id: string,
    userId: string,
    field: string,
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction
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
          const user = await this.user.findById(userId);
          user.fomo[field] = user.fomo[field] + 3;
          await user.save();
          const message = request.t('Payment successful');
          response.status(200).json({ status: 'success', message, user });
        } else {
          this.watchPaymentStatus(id, request.user.id, field);
          next(new PaymentNotFulfilledException());
        }
      }
    }
  };

  private watchPaymentStatus = async (
    sessionId: string,
    userId: string,
    field: string
  ): Promise<void> => {
    setTimeout(async () => {
      const payment = await this.payment.findOne({ sessionId: { $eq: sessionId } });
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      payment.status = session.payment_status;
      payment.save();
      const isPayed = session.payment_status === 'paid';
      if (isPayed) {
        const user = await this.user.findById(userId);
        user.fomo[field] = user.fomo[field] + 3;
        await user.save();
        const successMessage = {
          type: 'success',
          userId,
          payment: payment.id,
        }
        this.pubClient.publish('payments', JSON.stringify(successMessage));
      } else {
        const abandoned = Number(session.metadata.createdAt) + 36000000 < Date.now();
        if (abandoned) {
          await this.stripe.paymentIntents.cancel(session.payment_intent.toString());
          await payment.deleteOne();
        } else {
          const status = await (await this.stripe.paymentIntents.retrieve(session.payment_intent.toString())).status;
          if (status !== 'processing') {
            const continuePaymentMessage = {
              type: 'processing',
              userId,
              payment: sessionId,
            };
            this.pubClient.publish('payments', JSON.stringify(continuePaymentMessage));
          } else {
            this.watchPaymentStatus(sessionId, userId, field);
          }
        }
      }
    }, 60000);
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
      'invite-user'
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
      next
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
      'create-new-room'
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
      next
    );
  };
}
export default PaymentController;
