const { error } = require('../utils/response');

function validate(schema, source = 'body') {
  return (req, res, next) => {
    const { error: validationError, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (validationError) {
      return error(res, {
        statusCode: 422,
        message: 'Validation failed',
        errors: validationError.details.map((d) => ({
          field: d.path.join('.'),
          message: d.message,
        })),
      });
    }

    req[source] = value;
    next();
  };
}

module.exports = validate;
