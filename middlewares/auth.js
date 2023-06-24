// временно захардкодили авторизацию
const router = require('express').Router();
const { verifyToken } = require('../utils/jwt');

router.use((req, res, next) => {
  const { token } = req.cookies;
  if (!token) { throw new Error(); } // здесь нужна ошибка авторизации TODO

  const id = verifyToken(token)._id;

  if (id) {
    req.user = {
      _id: id,
    };
  } else { throw new Error(); } // здесь нужна ошибка авторизации TODO
  next();
});

module.exports = router;
