const User = require('../models/user');
const { checkError, FindError } = require('../utils/checkError');

const getUsers = (req, res) => User.find({})
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    const { status, message } = checkError(err);
    return res.status(status).send(message);
  });

const getUserById = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new FindError();
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      const { status, message } = checkError(err);
      return res.status(status).send(message);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      const { status, message } = checkError(err);
      return res.status(status).send(message);
    });
};

const updateUser = (req, res) => {
  const newDataUser = req.body;
  const userId = req.user._id;

  return User.findByIdAndUpdate(userId, newDataUser, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => {
      if (!user) {
        throw new FindError();
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      const { status, message } = checkError(err);
      return res.status(status).send(message);
    });
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
};
