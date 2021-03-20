class AppError extends Error {
   constructor(message, errCode) {
      super(message);

      this.statusCode = errCode;
      errCode = '' + errCode;
      this.status = errCode.startsWith('4') ? 'failed' : 'error';

      this.isOperational = true;

      Error.captureStackTrace(this, this.constructor);
   }
}

module.exports = AppError;
