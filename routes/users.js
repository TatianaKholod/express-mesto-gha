const router = require('express').Router();
const { celebrate } = require('celebrate');
const { ShemaUser, ShemaId } = require('../utils/celebrate');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getProfile,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getProfile);
router.get('/:id', celebrate(ShemaId), getUserById);

router.patch('/me', celebrate(ShemaUser), updateProfile);
router.patch('/me/avatar', celebrate(ShemaUser), updateAvatar);

module.exports = router;
