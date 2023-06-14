const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { checkError, FindError } = require('../utils/checkError');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('/', (req, res) => {
  const { status, message } = checkError(new FindError());
  return res.status(status).send(message);
});

module.exports = router;
