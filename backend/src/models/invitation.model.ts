import * as mongoose from 'mongoose';
import Invitation from '../interfaces/invitation.interface';

const invitationSchema = new mongoose.Schema({
  email: String,
  invitedBy: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  timestamp: Date,
  token: String,
});

const invitationModel = mongoose.model<Invitation & mongoose.Document>(
  'Invitation',
  invitationSchema
);

export default invitationModel;
