import HttpException from './HttpException';

class RoomNotFoundException extends HttpException {
  constructor() {
    super(404, `Room not found`);
  }
}

export default RoomNotFoundException;
