import HttpException from './HttpException';

class InvitationTokenMissingException extends HttpException {
  constructor() {
    super(400, 'Invitation not found.');
  }
}

export default InvitationTokenMissingException;
