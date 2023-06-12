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

module.exports = {
  getCards,
  delCardById,
  createCard,
};
