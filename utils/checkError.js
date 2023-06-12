/*global  module */
class FindError extends Error {
  constructor(message) {
    super(message);
    this.name = "FindError";
    this.message = "Запрашиваемый объект не найден";
  }
}
const mapError = (err) => {
  return Object.values(err.errors)
    .map((err) => err.message)
    .join(", ");
};

const checkError = (err) => {
  const definiteErr = {
    status: 500,
    message: { message:`Произошла ошибка ${err.message}`},
  };
  console.log(err);
  if (err.name === "ValidationError") {
    definiteErr.status = 400;
    definiteErr.message = { message:`Произошла ошибка ${mapError(err)}`}; //если несколько полей не прошли валидацию, то нужно вывести все ошибки
  }
  if (err.name === "FindError") {
    definiteErr.status = 404;
  }
  return definiteErr;
};

module.exports = {
  checkError,
  FindError
}