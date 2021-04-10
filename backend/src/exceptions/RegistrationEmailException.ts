import HttpException from './HttpException';

class RegistrationEmailException extends HttpException {
  constructor() {
    super(500, 'Unable to send verification email, try again later.');
  }
}

export default RegistrationEmailException;
