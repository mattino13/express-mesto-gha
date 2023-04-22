const { ValidationError } = require('mongoose').Error;

const NOT_FOUND_HTTP_STATUS = 404;
const VALIDATION_FAILED_HTTP_STATUS = 404;
const COMMON_SERVER_ERROR_STATUS = 500;

class NotFoundError extends Error {}

function handleHTTPError(err, res) {
  if (err instanceof NotFoundError) {
    res.status(NOT_FOUND_HTTP_STATUS).send({ message: err.message });
    return;
  }

  if (err instanceof ValidationError) {
    res.status(VALIDATION_FAILED_HTTP_STATUS).send({ message: `Произошла ошибка ${err}` });
    return;
  }

  res.status(COMMON_SERVER_ERROR_STATUS).send({ message: `Произошла ошибка ${err}` });
}

module.exports = { handleHTTPError, NotFoundError };
