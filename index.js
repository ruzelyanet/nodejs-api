//--Фреимворк express
const express = require('express');
//--Mongoose админка для работы с mongodb
const mongoose = require('mongoose');

//--Подтягиваем модели mongoose
require('./app/models');
//--Создаем объект конфигцрация
const config = require('./config');

//--Создаем объект express
const app = express();

//--Заруск bodyParser для обработки тела запроса HTTP POST
config.express(app);

//--Подтягиваем routes (сами запросы API)
config.routes(app);

//--конфигурация порт и путь до базы
const { appPort, mongoUri } = config.app;

//--подключение к mongoDB и запуск сервера
mongoose.connect(
    //--настройка mongoose
    mongoUri,
    {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    //--Прослушка сервера
).then(() => app.listen(
    //--Порт сервера
    appPort,
    () => console.log(`Listening on port ${appPort}...`))
).catch(error => console.error(`Error connecting to mongo: ${mongoUri}`, error));