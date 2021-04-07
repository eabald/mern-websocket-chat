import { format, transports } from 'winston';
import expressWinston from 'express-winston';

const errorFormatter = format.combine(
  format.timestamp(),
  format.metadata(),
  format.json(),
);

const ErrorLogger = expressWinston.errorLogger({
  transports: [new transports.File({ filename: 'logs/error.log' })],
  format: errorFormatter,
});

export default ErrorLogger;
