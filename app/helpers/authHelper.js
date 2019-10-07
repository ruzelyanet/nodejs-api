
const uuid = require('uuid/v4');//--универсальный уникальный идентификатор
const jwt = require('jsonwebtoken');
const { secret, tokens } = require('../../config/app').jwt;
const mongoose = require('mongoose');
const Token = mongoose.model('Token');


//--Генератор токена
const generateAccessToken = (userId) => {

    //--Настройки для созлания токена
    const payload = {
        userId,//
        type: tokens.access.type
    };
    //--Типа токена access и время жизни токена
    const options = { expiresIn: tokens.access.expiresIn };

    //--Метод создания токена
    return jwt.sign(payload, secret, options);
};

//--Генератор обноления токена
const generateRefreshToken = () => {

    //--Настройки для созлания токена
    const payload = {
        id: uuid(),//--Генерием id для токена
        type: tokens.refresh.type,
    };
    //--Типа токена refresh и время жизни токена
    const options = { expiresIn: tokens.refresh.expiresIn }

    //--Возвращаем объект с токеном
    return {
        id: payload.id,
        token: jwt.sign(payload, secret, options)
    }
}

//--Заменяем токен в базе или создаем токен
const replaceDbRefreshToken = (tokenId, userId) => {
    Token.findOneAndRemove({ userId })
        .exec()
        .then(() => Token.create({ tokenId, userId }));
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDbRefreshToken,
}