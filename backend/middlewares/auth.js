const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth_err');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new AuthError('Необходимо авторизоваться'));
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET');
  } catch (err) {
    next(new AuthError('Необходимо авторизоваться'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
