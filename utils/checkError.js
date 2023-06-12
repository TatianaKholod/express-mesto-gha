const ERROR_CODE_BADREQ = 400;
const ERROR_CODE_NOTFOUND = 404;
const ERROR_CODE_DB = 500;

class FindError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FindError';
    this.message = 'Запрашиваемый объект не найден';
  }
}
const mapError = (err) => Object.values(err.errors)
  .map((i) => i.message)
  .join(', ');

const checkError = (err) => {
  const definiteErr = {
    status: ERROR_CODE_DB,
    message: { message: err.message },
  };

  if (err.name === 'ValidationError') {
    definiteErr.status = ERROR_CODE_BADREQ;
    definiteErr.message = { message: mapError(err) };
    // если несколько полей не прошли валидацию, то нужно вывести все ошибки
  }
  if (err.name === 'CastError') definiteErr.status = ERROR_CODE_BADREQ;
  if (err.name === 'FindError') {
    definiteErr.status = ERROR_CODE_NOTFOUND;
  }
  return definiteErr;
};

module.exports = {
  checkError,
  FindError,
};
