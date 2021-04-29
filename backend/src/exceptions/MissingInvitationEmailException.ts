import HttpException from './HttpException';

class MissingInvitationEmailException extends HttpException {
  constructor() {
    super(400, 'Email to invite missing.');
  }
}

export default MissingInvitationEmailException;
