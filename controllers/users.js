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

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
