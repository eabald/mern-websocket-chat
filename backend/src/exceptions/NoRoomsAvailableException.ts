import HttpException from './HttpException';

class NoRoomsAvailableException extends HttpException {
  constructor() {
    super(400, 'No rooms available');
  }
}

export default NoRoomsAvailableException;
