const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/Forbidden-error');

const getCards = (req, res, next) => Card.find({}).populate('owner').populate('likes')
  .then((card) => res.send(card))
  .catch(next);

const delCardById = (req, res, next) => {
  const { id: cardId } = req.params;

  return Card.findById(cardId, 'owner')
    .orFail(new NotFoundError())
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id) { throw new ForbiddenError(); }
    })
    .then(() => Card.findByIdAndRemove(cardId)
      .then((card) => res.send(card)))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const likeCard = (req, res, next) => {
  const userId = req.user._id;
  const { id: cardId } = req.params;

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new NotFoundError())
    .then((card) => res.send(card))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const userId = req.user._id;
  const { id: cardId } = req.params;

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFoundError())
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards,
  delCardById,
  createCard,
  likeCard,
  dislikeCard,
};
