const express = require('express');
const mongoose = require('mongoose');
require('./app/models/product');
const config = require('./config');


const app = express();
config.express(app);
config.routes(app);


const { appPort, mongoUri } = config.app;


mongoose.connect(
    mongoUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => app.listen(
    appPort,
    () => console.log(`Listening on port ${config.appPort}...`))
).catch(error => console.error(`Error connecting to mongo: ${mongoUri}`, error));






