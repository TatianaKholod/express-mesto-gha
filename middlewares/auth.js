const router = require('express').Router();
const UnauthorizedError = require('../errors/unauthorized-error');
const { verifyToken } = require('../utils/jwt');

router.use((req, res, next) => {
  const { token } = req.cookies;
  if (!token) { throw new UnauthorizedError(); }

  const id = verifyToken(token)._id;

  if (id) {
    req.user = {
      _id: id,
    };
  } else { throw new UnauthorizedError(); }
  next();
});

module.exports = router;
