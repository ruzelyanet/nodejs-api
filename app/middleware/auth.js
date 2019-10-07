//--jsonwebtoken создает токент для авторизации
const jwt = require('jsonwebtoken');
//--Подтягиваем конфигурации jwt
const { secret } = require('../../config/app').jwt;

//--Проверка на акторизацию
module.exports = (req, res, next) => {
    //--То что должно попадать в Header запроса что бы авторизаваться
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(401).json({ message: 'Token not provided!' });
        return;
    }

    //--Токен из Header
    const token = authHeader.replace('Bearer', '');

    //--Проверка токена
    try {
        const payload = jwt.verify(token, secret);
        if (payload.type !== 'access') {
            res.status(401).json({ message: 'Invalid token!' });
            return;
        }
    } catch (e) {
        //--Если токен устарел
        if (e instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: 'Token expired!' });
            return;
        }
        //--Если токен не валидный
        if (e instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid token!' });
            return;
        }
    }

    next();
}