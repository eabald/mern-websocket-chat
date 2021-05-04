import HttpException from './HttpException';

class PaymentFailedException extends HttpException {
  constructor() {
    super(400, 'Payment failed.');
  }
}

export default PaymentFailedException;
