const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { checkError, FindError } = require('../utils/checkError');
const { generateToken } = require('../utils/jwt');

const HASH_SALT = 10;
const COOKIE_MAXAGE = 3600000 * 24 * 7;

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .orFail(new FindError()) // здесь нужна ошибка авторизации 401 TODO
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          // хеши не совпали — отклоняем промис
          return Promise.reject(new Error('Неправильные почта или пароль')); // это 401 TODO
        }
        return user._id;
      }))
    .then((id) => {
      const token = generateToken(id);
      // JWT в httpOnly куку
      res.cookie('token', token, {
        maxAge: COOKIE_MAXAGE,
        httpOnly: true,
      });
      return res.send({ _id: token });
    })
    .catch((err) => {
      const { status, message } = checkError(err);
      return res.status(status).send(message);
    });
};

const createUser = (req, res) => {
  const {
    password, email, name, about, avatar,
  } = req.body;
  return bcrypt.hash(password, HASH_SALT)
    .then((hash) => User.create({
      password: hash, email, name, about, avatar,
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      const { status, message } = checkError(err);
      return res.status(status).send(message);
    });
};

module.exports = {
  createUser,
  login,
};
