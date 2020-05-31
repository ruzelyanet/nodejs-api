const mongoose = require("mongoose");

//--Используем для шифрования пароля
const bCrypt = require("bcrypt");
//--Используем для создание токена авторизации
const jwt = require("jsonwebtoken");

//--Подтягиваем хелпер ваторизации
const authHelper = require("../helpers/authHelper");

//--Подтягиваем проверку  на тип токена
const { secret } = require("../../config/app").jwt;

//--Подтягиваем модели для mongoDb
const User = mongoose.model("User");
const Token = mongoose.model("Token");

//--Функция создания токенов при авторизации
const updateTokens = userId => {
  const accessToken = authHelper.generateAccessToken(userId);
  const refreshToken = authHelper.generateRefreshToken();
  authHelper.replaceDbRefreshToken(refreshToken.id, userId);

  //--Возвращаем два токена
  return {
    accessToken,
    refreshToken: refreshToken.token
  };
};

//--Функция авторизации
const signIn = (req, res) => {
  //--Выстаскиваем из запроса на авторизацию логин и пароль
  const { email, password } = req.body;

  //--Ищем в базе такого пользователя
  User.findOne({ email })
    .exec()
    .then(user => {
      //--Если такого пользователя нет
      if (!user) {
        res.status(401).json({ message: "User does not exist!" });
      }

      /* console.log(password);
      console.log(user.password); */

      //--Расшифровка пароля
      const isValid = bCrypt.compareSync(password, user.password);

      if (isValid) {
        //--Если пароль верный то возращаем токен
        const tokens = updateTokens(user._id);
        res.json(tokens);
      } else {
        //--Если пароль не верный то возращаем сообщение
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    //--Если ошибка в try то отправляем сообщение об ошибке
    .catch(err => res.status(500).json({ message: err.message }));
};

//--Обновление токенов
const refreshTokens = (req, res) => {
  //--Подтягиваем из тела запроса refreshToken
  const { refreshToken } = req.body;
  let payload;
  try {
    //--Провряем токен
    payload = jwt.verify(refreshToken, secret);
    if (payload.type !== "refresh") {
      res.status(400).json({ message: "Invalid token!" });
      return;
    }
  } catch (e) {
    //--Выводим ошибку если токен не валидный
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: "Invalid token!" });
      return;
    } else if (e instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ message: "Invalid token!" });
      return;
    }
  }

  //--Ищем токен в базе
  Token.findOne({ tokenId: payload.id })
    .exec()
    .then(token => {
      //--Если токен не правильный
      if (token === null) {
        throw new Error("Invalid token!");
      }
      //--Если токен правильный то обновлеяем токены
      return updateTokens(token.userId);
    })
    //--Завем передаем в тело запроса
    .then(tokens => {
      res.json(tokens);
    })
    .catch(err => res.status(400).json({ message: `${err.message}` }));
};

module.exports = {
  signIn,
  refreshTokens
};
