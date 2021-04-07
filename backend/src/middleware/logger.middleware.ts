import { format, transports } from 'winston';
import expressWinston from 'express-winston';

const infoFormatter = format.combine(
  format.timestamp(),
  format.metadata(),
  format.printf(({ level, message, timestamp, metadata }) => `${timestamp} ${level}: ${message}, ${metadata.meta.res.statusCode}, ${metadata.meta.req.headers['user-agent']}`)
);

const debugFormatter = format.combine(
  format.timestamp(),
  format.metadata(),
  format.json(),
);

const transportsArray: transports.FileTransportInstance[] = [
  new transports.File({ filename: 'logs/error.log', level: 'error' }),
  new transports.File({ filename: 'logs/access.log', level: 'info', format: infoFormatter }),
];

if (process.env.NODE_ENV !== 'production') {
  transportsArray.push(new transports.File({ filename: 'logs/debug.log', level: 'debug', format: debugFormatter }));
}

const logger = expressWinston.logger({
  transports: transportsArray,
  expressFormat: false,
});
export default logger;
