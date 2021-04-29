import HttpException from './HttpException';

class InvitationAlreadySentException extends HttpException {
  constructor() {
    super(400, 'Invitation already sent to this email.');
  }
}

export default InvitationAlreadySentException;
