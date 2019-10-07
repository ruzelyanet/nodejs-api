const mongoose = require('mongoose');

//--Модеть/Схема токена для mongoDB
const TokenSchema = new mongoose.Schema({
    tokenId: String,
    userId: String
});

mongoose.model('Token', TokenSchema);