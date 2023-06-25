const { EROR_CODE_CONFLICT } = require('./code-errors');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = EROR_CODE_CONFLICT;
    this.message = message || 'Конфликт';
  }
}

module.exports = ConflictError;
