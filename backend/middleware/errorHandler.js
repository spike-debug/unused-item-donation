const errorHandler = (err, req, res, next) => {
  console.error('❌ ERROR:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({
    status: err.status || 'error',
    message,
  });
};

export default errorHandler;
