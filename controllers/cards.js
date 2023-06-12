/*global  require,module */
const Card = require("../models/card");
const { checkError, FindError } = require("../utils/checkError");

const getCards = (req, res) => {
  return Card.find({})
    .then((card) => {
      return res.status(200).send(card);
    })
    .catch((err) => {
      const { status, message } = checkError(err);
      return res.status(status).send(message);
    });
};

const delCardById = (req, res) => {
  const { cardId } = req.params;

  return Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        throw new FindError();
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      const { status, message } = checkError(err);
      return res.status(status).send(message);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => {
      return res.status(201).send(card);
    })
    .catch((err) => {
      const { status, message } = checkError(err);
      return res.status(status).send(message);
    });
};

const likeCard = (req, res) => {
  const userId = req.user._id;
  const cardId = req.params.cardId;

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new FindError();
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      const { status, message } = checkError(err);
      return res.status(status).send(message);
    });
};

const dislikeCard = (req, res) => {
  const userId = req.user._id;
  const cardId = req.params.cardId;

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new FindError();
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      const { status, message } = checkError(err);
      return res.status(status).send(message);
    });
};

module.exports = {
  getCards,
  delCardById,
  createCard,
  likeCard,
  dislikeCard,
};
