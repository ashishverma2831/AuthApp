const errorHandler = (err, req, res, next) => {
  console.error(err);

  let message = 'Internal Server Error';
  let status = err.statusCode || err.status || 500;

  if (typeof err === 'string') {
    message = err;
  } else if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  } else if (err.code === 11000) {
    status = 409;
    message = `Duplicate value for: ${Object.keys(err.keyValue).join(', ')}`;
  } else if (err.name === 'CastError') {
    status = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err.message) {
    message = err.message;
  } else {
    message = JSON.stringify(err);
  }

  res.status(status).json({ success: false, message });
};

module.exports = errorHandler;
