const mongoose = require('mongoose');

//--Модеть/Схема пользователя для mongoDB
const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

mongoose.model('User', UserSchema);