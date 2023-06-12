/*global require, module */
const router = require("express").Router();
const userRoutes = require("./users");
const cardRoutes = require("./cards");

//временно захардкодили авторизацию
router.use((req, res, next) => {
  req.user = {
    _id: '6485d8cecdcca7279b35193c'
  };

  next();
});

router.use("/users",userRoutes);
router.use("/cards",cardRoutes);

module.exports = router;