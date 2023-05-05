const { HTTPError } = require('./HTTPError');
const { COMMON_SERVER_ERROR_STATUS } = require('./consts');

class NotImplementedError extends HTTPError {
  constructor(message) {
    super(message, COMMON_SERVER_ERROR_STATUS);
  }
}

module.exports = { NotImplementedError };
