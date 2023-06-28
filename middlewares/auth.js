const UnauthorizedError = require('../errors/unauthorized-error');
const { verifyToken } = require('../utils/jwt');

const authMiddelware = ((req, res, next) => {
  const { token } = req.cookies;
  if (!token) { return next(new UnauthorizedError('Вы не авторозованы')); }

  if (!verifyToken(token)._id) { return next(new UnauthorizedError('Вы не авторозованы')); }

  try {
    const id = verifyToken(token)._id;
    if (id) {
      req.user = {
        _id: id,
      };
    } else { return next(new UnauthorizedError('Вы не авторозованы')); }
  } catch (err) {
    return next(new UnauthorizedError('Вы не авторозованы'));
  }

  return next();
});

module.exports = authMiddelware;
