import HttpException from './HttpException';

class VerificationTokenExpiredException extends HttpException {
  constructor() {
    super(401, 'Verification email expired, sending new one.');
  }
}

export default VerificationTokenExpiredException;
