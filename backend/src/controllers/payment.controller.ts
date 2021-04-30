import Controller from '../interfaces/controller.interface';
import * as express from 'express';
import userModel from './../models/user.model';
import authMiddleware from '../middleware/auth.middleware';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import Stripe from 'stripe';
import PaymentNotFulfilledException from '../exceptions/PaymentNotFulfilledException';
import PriceData from '../interfaces/priceData.interface';

class PaymentController implements Controller {
  public path = '/invitation';
  public router = express.Router();
  private user = userModel;
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/buy-invitations', authMiddleware, this.buyInvitations);
    this.router.post(
      '/buy-invitations-success',
      authMiddleware,
      this.buyInvitationsSuccess
    );
    this.router.post('/buy-rooms', authMiddleware, this.buyRooms);
    this.router.post('/buy-rooms-success', authMiddleware, this.buyRoomsSuccess);
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
      success_url: `${process.env.DOMAIN}/modal/${request.t(path)}?payed=true`,
      cancel_url: `${process.env.DOMAIN}/modal/${request.t(path)}?error=true`,
    });
  }

  private verifyPaymentAndProcess = async (
    id: string,
    userId: string,
    field: string,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const session = await this.stripe.checkout.sessions.retrieve(id);
    const isPayed = session.payment_status === 'paid';
    if (isPayed) {
      const user = await this.user.findById(userId);
      user.fomo[field] = user.fomo[field] + 3;
      await user.save();
      response.status(200).json({ user });
    } else {
      next(new PaymentNotFulfilledException());
    }
  };

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
    response.status(200).json({ id: session.id });
  };

  private buyInvitationsSuccess = async (
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const sessionId = request.body.id;
    await this.verifyPaymentAndProcess(
      sessionId,
      request.user._id,
      'invitations',
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
    response.status(200).json({ id: session.id });
  };

  private buyRoomsSuccess = async (
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const sessionId = request.body.id;
    await this.verifyPaymentAndProcess(
      sessionId,
      request.user._id,
      'roomsLimit',
      response,
      next
    );
  };
}
export default PaymentController;
