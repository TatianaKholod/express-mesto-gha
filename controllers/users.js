/*global  require,module */
const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
      console.log(`Ощибка создания пользователя ${err.message}`);
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
      console.log(`Ощибка создания пользователя ${err.message}`);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
      res.status(201);
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
      console.log(`Ощибка создания пользователя ${err.message}`);
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
      res.send({ data: user });
      res.status(200);
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
      console.log(`Ощибка обновления пользователя ${err.message}`);
    });
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
};
