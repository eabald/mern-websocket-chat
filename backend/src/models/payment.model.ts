import * as mongoose from 'mongoose';
import Payment from '../interfaces/payment.interface';

const paymentSchema = new mongoose.Schema({
  sessionId: String,
  value: Number,
  status: String,
  type: String,
  additionalData: mongoose.Schema.Types.Mixed,
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  }
});

const paymentModel = mongoose.model<Payment & mongoose.Document>(
  'Payment',
  paymentSchema
);

export default paymentModel;
