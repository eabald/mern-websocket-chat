import * as express from 'express';

function logger(request: express.Request, response: express.Response, next) {
  console.log(`${request.method} ${request.path}`);
  next();
};

export default logger;
