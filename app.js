/*global require, process */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const routes = require("./routes");

const { PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect("mongodb://localhost:27017/mestodb", {
    useNewUrlParser: true,
    family: 4,
  })
  .then(() => {
    console.log("Подключились к БД ");
  })
  .catch((err) => {
    console.log(`Ощибка подключения к БД ${err.message}`);
  });

app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
