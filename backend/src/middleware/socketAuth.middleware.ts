import SocketWithUser from '../interfaces/socketWithUser.interface';
import AuthenticationService from '../services/authentication.service';

async function socketAuth(
  socket: SocketWithUser,
  next: (err?: Error) => void
): Promise<void> {
  const authToken = socket.handshake.auth.token ?? '';
  const err = new Error('Unauthorized');
  err.message = 'Unauthorized';
  if (authToken) {
    try {
      const authService = new AuthenticationService();
      let user = await authService.findAndVerifyUser(authToken);
      if (user) {
        socket.user = user;
        user.socketId = socket.id;
        user = await user.save();
        next();
      } else {
        next(err);
        socket.disconnect(true);
      }
    } catch (error) {
      next(err);
      socket.disconnect(true);
    }
  } else {
    next(err);
    socket.disconnect(true);
  }
}

export default socketAuth;
