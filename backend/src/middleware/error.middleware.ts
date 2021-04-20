import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const status = error.status || 500;
  const params = error.params
  const message = request.t(error.message || 'Something went wrong', params);
  response.status(status).json({
    status,
    message,
  });
}

export default errorMiddleware;
