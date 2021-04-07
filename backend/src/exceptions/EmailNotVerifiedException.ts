
import HttpException from './HttpException';

class EmailNotVerifiedException extends HttpException {
  constructor() {
    super(401, 'Email not verified, check your inbox for verification email.');
  }
}

export default EmailNotVerifiedException;
