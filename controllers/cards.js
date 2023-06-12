/*global  require,module */
const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
      console.log(`Ощибка ${err.message}`);
    });
};

const delCardById = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
      console.log(`Ощибка создания пользователя ${err.message}`);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.send({ data: card });
      res.status(201);
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
      console.log(`Ощибка создания карточки ${err.message}`);
    });
};

const likeCard = (req, res) => {
  const userId = req.user._id;
  const cardId = req.params.cardId;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      res.send({ data: card });
      res.status(201);
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
      console.log(`Ощибка создания карточки ${err.message}`);
    });
};

const dislikeCard = (req, res) => {
  const userId = req.user._id;
  const cardId = req.params.cardId;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      res.send({ data: card });
      res.status(201);
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
      console.log(`Ощибка создания карточки ${err.message}`);
    });
};

module.exports = {
  getCards,
  delCardById,
  createCard,
  likeCard,
  dislikeCard,
};
