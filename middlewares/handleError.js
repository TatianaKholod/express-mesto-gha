const { ERROR_CODE_BADREQ, ERROR_CODE_DB } = require('../errors/code-errors');

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
    default:
      definiteErr.status = ERROR_CODE_DB;
      definiteErr.message = { message: err.message };
      break;
  }
  return definiteErr;
};

const handleError = ((err, req, res, next) => {
  if (err.statusCode) { res.status(err.statusCode).send({ message: err.message }); }
  const definiteErr = checkError(err);
  res.status(definiteErr.status).send(definiteErr.message);
  next();
});

module.exports = handleError;
