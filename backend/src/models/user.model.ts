import * as mongoose from 'mongoose';
import User from '../interfaces/user.interface';

const subscriptionSchema = new mongoose.Schema({
  endpoint: { type: String, unique: true, required: true },
  expirationTime: { type: Number, required: false },
  keys: {
    auth: String,
    p256dh: String,
  },
});

const fomoSchema = new mongoose.Schema({
  invitations: Number,
  invitationsFulfilled: Number,
  refreshDate: {
    type: Date,
    required: true,
  },
  roomsLimit: Number,
})

const userSchema = new mongoose.Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
    socketId: String,
    username: String,
    terms: Boolean,
    verificationToken: String,
    resetToken: String,
    emailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      get: (): undefined => undefined,
    },
    blockedBy: [
      {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    rooms: [
      {
        ref: 'Room',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    unread: [
      {
        ref: 'Room',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    subscription: subscriptionSchema,
    fomo: fomoSchema,
    payments: [
      {
        ref: 'Payment',
        type: mongoose.Schema.Types.ObjectId,
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
