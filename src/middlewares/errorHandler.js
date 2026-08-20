const multer = require('multer');
const { error } = require('../utils/response');

function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    return error(res, {
      statusCode: 400,
      message: `Upload error: ${err.message}`,
    });
  }
  if (err.message === 'Only image files are allowed') {
    return error(res, { statusCode: 400, message: err.message });
  }

  console.error(err);
  return error(res, {
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal server error',
  });
}

module.exports = errorHandler;
