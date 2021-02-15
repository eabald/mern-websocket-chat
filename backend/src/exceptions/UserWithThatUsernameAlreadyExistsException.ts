import HttpException from './HttpException';

class UserWithThatUsernameAlreadyExistsException extends HttpException {
  constructor(username: string) {
    super(400, `User with username ${username} already exists`);
  }
}

export default UserWithThatUsernameAlreadyExistsException;
