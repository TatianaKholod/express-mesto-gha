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
  const definiteErr = {};
  switch (err.name) {
    case 'ValidationError':
      definiteErr.status = ERROR_CODE_BADREQ;
      definiteErr.message = { message: mapError(err) };
      // если несколько полей не прошли валидацию, то нужно вывести все ошибки
      break;
    case 'CastError':
      definiteErr.status = ERROR_CODE_BADREQ;
      definiteErr.message = { message: err.message };
      break;
    case 'FindError':
      definiteErr.status = ERROR_CODE_NOTFOUND;
      definiteErr.message = { message: err.message };
      break;
    default:
      definiteErr.status = ERROR_CODE_DB;
      definiteErr.message = { message: err.message };
      break;
  }
  return definiteErr;
};

module.exports = {
  checkError,
  FindError,
};
