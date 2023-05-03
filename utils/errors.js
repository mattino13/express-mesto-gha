const { ValidationError, CastError } = require('mongoose').Error;

const NOT_FOUND_HTTP_STATUS = 404;
const UNAUTHORIZED_HTTP_STATUS = 401;
const BAD_REQUEST_HTTP_STATUS = 400;
const FORBIDDEN_HTTP_STATUS = 403;
const CONFLICT_HTTP_STATUS = 409;
const COMMON_SERVER_ERROR_STATUS = 500;

class HTTPError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class NotFoundError extends HTTPError {
  constructor(message) {
    super(message, NOT_FOUND_HTTP_STATUS);
  }
}

class UnauthorizedError extends HTTPError {
  constructor(message) {
    super(message, UNAUTHORIZED_HTTP_STATUS);
  }
}

class ForbiddenError extends HTTPError {
  constructor(message) {
    super(message, FORBIDDEN_HTTP_STATUS);
  }
}

function handleServerError(err, res) {
  if (err instanceof HTTPError) {
    res.status(err.statusCode).send({ message: err.message });
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

  // MongoDB duplicate key
  if (err.code === 11000) {
    res.status(CONFLICT_HTTP_STATUS).send({ message: 'Пользователь с таким e-mail уже существует' });
    return;
  }

  res.status(COMMON_SERVER_ERROR_STATUS).send({ message: 'Внутренняя ошибка сервера' });
}

module.exports = {
  handleServerError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  NOT_FOUND_HTTP_STATUS,
};
