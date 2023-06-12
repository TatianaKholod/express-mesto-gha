/*global  require,module */
const User = require("../models/user");
const {checkError, FindError} = require("../utils/checkError");

const getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      const { status, message } = checkError(err);
      return res.status(status).send(message);
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new FindError();
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      const { status, message } = checkError(err);
      return res.status(status).send(message);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      return res.status(201).send({ data: user });
    })
    .catch((err) => {
      const { status, message } = checkError(err);
      return res.status(status).send(message);
    });
};

const updateUser = (req, res) => {
  const newDataUser = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, newDataUser, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: true, // если пользователь не найден, он будет создан
  })
    .then((user) => {
      return res.status(200).send({ data: user });
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
