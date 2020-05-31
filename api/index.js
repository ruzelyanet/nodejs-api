//--Фреимворк express
const express = require("express");
//--Mongoose админка для работы с mongodb
const mongoose = require("mongoose");

//--Подтягиваем модели mongoose
require("./app/models");
//--Создаем объект конфигцрация
const config = require("./config");

//--Создаем объект express
const app = express();

//--Запуск bodyParser для обработки тела запроса HTTP POST
config.express(app);

//--Подтягиваем routes (сами запросы API)
config.routes(app);

//--конфигурация порт и путь до базы
const { appPort, mongoUri } = config.app;

app.get("/api/", (req, res) => {
  // eslint-disable-next-line no-undef
  res.sendFile(`${__dirname}/index.html`);
});

app.get("/api/ruz/", (req, res) => {
  // eslint-disable-next-line no-undef
  res.send(`<h1 style="text-align: center">Ruzeller</h1>`);
});

app.get("/api/ruz/:id", (req, res) => {
  // eslint-disable-next-line no-undef
  res.send(`<h1 style="text-align: center">Ruzeller ${req.params.id}</h1>`);
});

//--подключение к mongoDB и запуск сервера
mongoose
  .connect(
    //--настройка mongoose
    mongoUri,
    {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    //--Прослушка сервера
  )
  .then(() =>
    app.listen(
      //--Порт сервера
      appPort,
      () => console.log(`Listening on port ${appPort}...`)
    )
  )
  .catch(error =>
    console.error(`Error connecting to mongo: ${mongoUri}`, error)
  );
