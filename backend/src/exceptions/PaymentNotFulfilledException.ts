import HttpException from './HttpException';

class PaymentNotFulfilledException extends HttpException {
  constructor() {
    super(400, 'Payment not fulfilled yet. Wait for email with confirmation.');
  }
}

export default PaymentNotFulfilledException;
