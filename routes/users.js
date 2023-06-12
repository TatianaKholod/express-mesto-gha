/*global require, module */

const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
} = require("../controllers/users");

router.post("/", createUser);

router.get("/", getUsers);

router.get("/:userId", getUserById);

router.patch("/me", updateUser);
router.patch("/me/avatar", updateUser);

module.exports = router;
