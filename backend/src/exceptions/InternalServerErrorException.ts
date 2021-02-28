import HttpException from './HttpException';

class InternalServerErrorException extends HttpException {
  constructor() {
    super(500, 'Internal server error.');
  }
}

export default InternalServerErrorException;
