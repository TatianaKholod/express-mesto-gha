const User = require('../models/user');
const { checkError, FindError } = require('../utils/checkError');

const getUsers = (req, res) => User.find({})
  .then((user) => res.send(user))
  .catch((err) => {
    const { status, message } = checkError(err);
    return res.status(status).send(message);
  });

const getProfile = (req, res) => res.redirect(`/users/${req.user._id}`);

const getUserById = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .orFail(new FindError())
    .then((user) => res.send(user))
    .catch((err) => {
      const { status, message } = checkError(err);
      return res.status(status).send(message);
    });
};

const updateUser = (req, res, arrNeedfulKeys) => {
  const newDataUser = {};
  const userId = req.user._id;

  arrNeedfulKeys.forEach((key) => {
    newDataUser[key] = req.body[key];
  });

  return User.findByIdAndUpdate(userId, newDataUser, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .orFail(new FindError())
    .then((user) => res.send(user))
    .catch((err) => {
      const { status, message } = checkError(err);
      return res.status(status).send(message);
    });
};

const updateAvatar = (req, res) => {
  updateUser(req, res, ['avatar']);
};

const updateProfile = (req, res) => {
  updateUser(req, res, ['name', 'about']);
};

module.exports = {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getProfile,
};
