import * as mongoose from 'mongoose';
import RefreshToken from '../interfaces/refreshToken.interface';

const refreshTokenSchema = new mongoose.Schema({
  token: String,
});

const refreshTokenModel = mongoose.model<RefreshToken & mongoose.Document>(
  'RefreshToken',
  refreshTokenSchema
);

export default refreshTokenModel;
