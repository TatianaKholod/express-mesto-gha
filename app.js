const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

// глобальный обработчик ошибок, пока только сообщим о неотловленной ошибке
process.on('uncaughtException', (err, origin) => {
  // eslint-disable-next-line no-console
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});

mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    family: 4,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Подключились к БД ');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(`Ощибка подключения к БД ${err.message}`);
  });

// временно захардкодили авторизацию
app.use((req, res, next) => {
  req.user = {
    _id: '6485d8cecdcca7279b35193c',
  };

  next();
});

app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер работает на порту ${PORT}`);
});
