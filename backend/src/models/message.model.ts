import * as mongoose from 'mongoose';
import Message from '../interfaces/message.interface';

const messageSchema = new mongoose.Schema({
  content: String,
  timestamp: Date,
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  room: {
    ref: 'Room',
    type: mongoose.Schema.Types.ObjectId,
  }

});

const messageModel = mongoose.model<Message & mongoose.Document>('Message', messageSchema);

export default messageModel;
