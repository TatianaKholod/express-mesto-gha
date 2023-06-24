const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const authMiddelware = require('../middlewares/auth');
const { checkError, FindError } = require('../utils/checkError');
const { createUser, login } = require('../controllers/auth');

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/', authMiddelware);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('/', (req, res) => {
  const { status, message } = checkError(new FindError());
  return res.status(status).send(message);
});

module.exports = router;
