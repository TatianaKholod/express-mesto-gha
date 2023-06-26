const router = require('express').Router();
const { celebrate, errors } = require('celebrate');
const { ShemaLogin } = require('../utils/celebrate');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const authMiddelware = require('../middlewares/auth');
const handleError = require('../middlewares/handleError');
const { createUser, login } = require('../controllers/auth');
const NotFoundError = require('../errors/not-found-error');

router.post('/signin', celebrate(ShemaLogin), login);
router.post('/signup', celebrate(ShemaLogin), createUser);

router.use('/', authMiddelware);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req, res, next) => { next(new NotFoundError('URL неверный')); });

router.use(errors());
router.use(handleError);

module.exports = router;
