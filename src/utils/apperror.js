class AppError {
  statusCode;
  Message;

  constructor(message, statusCode = 400) {
    this.statusCode = statusCode
    this.message = message 
  }
}

module.exports = AppError