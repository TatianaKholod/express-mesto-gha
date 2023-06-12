/*global require, module */

const router = require("express").Router();
const { getUsers, getUserById, createUser } = require("../controllers/users");

router.post("/", createUser);

router.get("/", getUsers);

router.get("/:userId", getUserById);

module.exports = router;
