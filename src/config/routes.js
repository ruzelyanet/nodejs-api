//--Подтягиваем контроллеры на создание удалиени изменения... продукта
const products = require('../app/controllers/products');
//--Подтягиваем контроллер авторизации
const auth = require('../app/controllers/auth');

//--Подтягиваем модуль промежуточного слоя для авторизауии
const authMiddleware = require('../app/middleware/auth');

//--Экпорт роутов Api
module.exports = (app) => {

    app.get('/', (req, res) => {
        res.send('common index nodejs');
    });

    /*
        Поток прохождения запроса:
        ://запрос / проверка промежуточного слоя на авторизацию / выполнение запроса

        если authMiddleware не прошел то отправляет не соответствие jwt-токена
    */

    //products
    app.get('/products', authMiddleware, products.getAll);
    app.post('/products', authMiddleware, products.create);
    app.put('/products/:id', authMiddleware, products.update);
    app.delete('/products/:id', authMiddleware, products.remove);


    /*
        Поток прохождения запроса на авторизацию:
        ://запрос / выполнение запроса
    */

    //auth
    app.post('/signin', auth.signIn);
    app.post('/refresh-tokens', auth.refreshTokens);
};