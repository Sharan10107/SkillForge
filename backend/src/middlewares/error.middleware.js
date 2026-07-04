const ApiError = require('../utils/ApiError');
const { nodeEnv } = require('../config/env');

// Single place that turns any thrown error (ApiError, Mongoose error,
// JWT error, or unexpected bug) into a consistent JSON response shape.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Internal server error';

    if (error.name === 'CastError') {
      statusCode = 400;
      message = `Invalid value for field "${error.path}"`;
    }
    if (error.code === 11000) {
      statusCode = 409;
      const field = Object.keys(error.keyValue || {})[0];
      message = `${field} already exists`;
    }
    if (error.name === 'ValidationError') {
      statusCode = 400;
      message = Object.values(error.errors).map((e) => e.message).join(', ');
    }

    error = new ApiError(statusCode, message);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors || [],
    stack: nodeEnv === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
