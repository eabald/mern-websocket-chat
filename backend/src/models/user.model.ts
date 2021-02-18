import * as mongoose from 'mongoose';
import User from '../interfaces/user.interface';

const userSchema = new mongoose.Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
    socketId: String,
    username: String,
    password: {
      type: String,
      get: (): undefined => undefined,
    },
    rooms: [
      {
        ref: 'Room',
        type: mongoose.Schema.Types.ObjectId,
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
);

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
