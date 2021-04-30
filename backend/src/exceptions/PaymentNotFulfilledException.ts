import HttpException from './HttpException';

class PaymentNotFulfilledException extends HttpException {
  constructor() {
    super(400, 'Payment not fulfilled yet.');
  }
}

export default PaymentNotFulfilledException;
