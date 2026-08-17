const { error } = require('../utils/response');

function errorHandler(err, req, res, next) {
  console.error(err);
  return error(res, {
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal server error',
  });
}

module.exports = errorHandler;
