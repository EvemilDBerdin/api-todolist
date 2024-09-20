const errorHandler = (err, req, res, next) => {
    // Log the error for server-side debugging
    console.error(err);
  
    // Determine the status code
    const statusCode = err.statusCode || 500;
  
    // Prepare the error response
    const errorResponse = {
      error: {
        message: err.message || 'An unexpected error occurred',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      }
    };
  
    // Send the error response
    res.status(statusCode).json(errorResponse);
  };
  
  module.exports = errorHandler;