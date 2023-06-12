/*global require, module */
const router = require("express").Router();
const userRoutes = require("./users");
const cardRoutes = require("./cards");

router.use("/users",userRoutes);

//временно захардкодили авторизацию
router.use((req, res, next) => {
  req.user = {
    _id: '6485d8cecdcca7279b35193c'
  };

  next();
});

router.use("/cards",cardRoutes);

module.exports = router;