class HttpException extends Error {
  status: number;
  message: string;
  params: {[x: string]: string}
  constructor(status: number, message: string, params: {[x: string]: string} = {}) {
    super(message);
    this.status = status;
    this.message = message;
    this.params = params;
  }
}

export default HttpException;
