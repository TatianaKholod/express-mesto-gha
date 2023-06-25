const router = require('express').Router();
const { celebrate } = require('celebrate');
const { ShemaCard } = require('../utils/celebrate');
const {
  getCards,
  delCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post('/', celebrate(ShemaCard), createCard);

router.get('/', getCards);

router.delete('/:cardId', delCardById);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
