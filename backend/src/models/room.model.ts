import * as mongoose from 'mongoose';
import Room from '../interfaces/room.interface';

const roomSchema = new mongoose.Schema(
  {
    name: String,
    type: { type: String, default: 'room' },
    users: [
      {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    messages: [
      {
        ref: 'Message',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const roomModel = mongoose.model<Room & mongoose.Document>('Room', roomSchema);

export default roomModel;
