import userModel from '../models/user.model';
import User from '../interfaces/user.interface';
import * as jwt from 'jsonwebtoken';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';

class AuthenticationService {
  private secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET;
  }

  public async findAndVerifyUser(token: string): Promise<User> {
    const verificationResponse = jwt.verify(
      token,
      this.secret
    ) as DataStoredInToken;
    const id = verificationResponse._id;
    const user = await userModel.findById(id);
    return user;
  }
}

export default AuthenticationService;
