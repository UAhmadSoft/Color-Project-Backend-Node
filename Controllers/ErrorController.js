const sendDevelopmentError = (err, res) => {
   res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      errorStack: err.stack,
   });
};

const sendProductionError = (err, res) => {
   // Operational Error ...Can be trusted . Send to Client
   if (err.isOperational) {
      res.status(err.status).json({
         status: err.status,
         message: err.message,
      });
   }

   //    Not Operational ....Cannot be trusted
   // Send Generic Message to Client Only

   res.status(500).json({
      status: 'error',
      message: 'Something Went Very Wrong',
   });
};

// Global Error Handler
module.exports = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   err.status = err.status || 'error';

   console.log('ERROR', err);

   if (process.env.NODE_ENV === 'developemnt') {
      sendDevelopmentError(err, res);
   } else {
      sendProductionError(err, res);
   }
};
