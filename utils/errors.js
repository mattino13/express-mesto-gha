const { ValidationError, CastError } = require('mongoose').Error;

const NOT_FOUND_HTTP_STATUS = 404;
const BAD_REQUEST_HTTP_STATUS = 400;
const COMMON_SERVER_ERROR_STATUS = 500;

class NotFoundError extends Error {}

function handleHTTPError(err, res) {
  if (err instanceof NotFoundError) {
    res.status(NOT_FOUND_HTTP_STATUS).send({ message: err.message });
    return;
  }

  if (err instanceof ValidationError) {
    res.status(BAD_REQUEST_HTTP_STATUS).send({ message: `Произошла ошибка ${err}` });
    return;
  }

  if (err instanceof CastError) {
    res.status(BAD_REQUEST_HTTP_STATUS).send({ message: `Произошла ошибка ${err}` });
    return;
  }

  res.status(COMMON_SERVER_ERROR_STATUS).send({ message: `Произошла ошибка ${err}` });
}

module.exports = { handleHTTPError, NotFoundError };
