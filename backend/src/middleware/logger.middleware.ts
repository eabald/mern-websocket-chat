import * as express from 'express';

function logger(request: express.Request, response: express.Response, next) : void {
  console.log(request.method, request.path, request.body);
  next();
};

export default logger;
