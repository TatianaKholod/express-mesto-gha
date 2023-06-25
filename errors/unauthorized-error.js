const { ERROR_CODE_UNAUTH } = require('./code-errors');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = ERROR_CODE_UNAUTH;
    this.message = message || 'Не авторизованы';
  }
}

module.exports = UnauthorizedError;
