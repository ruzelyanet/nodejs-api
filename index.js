const express = require('express');
const mongoose = require('mongoose');
require('./app/models');
const config = require('./config');


const app = express();
config.express(app);
config.routes(app);


const { appPort, mongoUri } = config.app;

//подключение к mongoDB и запуск сервера
mongoose.connect(
    mongoUri,
    {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => app.listen(
    appPort,
    () => console.log(`Listening on port ${appPort}...`))
).catch(error => console.error(`Error connecting to mongo: ${mongoUri}`, error));