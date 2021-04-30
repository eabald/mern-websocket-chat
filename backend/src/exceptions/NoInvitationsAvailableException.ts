import HttpException from './HttpException';

class NoInvitationsAvailableException extends HttpException {
  constructor() {
    super(400, 'No invitations available');
  }
}

export default NoInvitationsAvailableException;
