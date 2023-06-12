/*global require, module */

const router = require("express").Router();
const { getCards, delCardById, createCard } = require("../controllers/cards");

router.post("/", createCard);

router.get("/", getCards);

router.delete("/:cardId", delCardById);

module.exports = router;
