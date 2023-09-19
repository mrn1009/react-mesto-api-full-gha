const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth_err');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (!token) {
    throw new AuthError('Необходимо авторизоваться');
  }
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    throw new AuthError('Необходимо авторизоваться');
  }
  req.user = payload;
  next();
};

module.exports = auth;
