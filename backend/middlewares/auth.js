const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth_err');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new AuthError('Необходимо авторизоваться'));
    return;
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
