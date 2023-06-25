const { ERROR_CODE_NOTFOUND } = require('./code-errors');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = ERROR_CODE_NOTFOUND;
    this.message = message || 'Запрашиваемый объект не найден';
  }
}

module.exports = NotFoundError;
