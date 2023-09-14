const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad_request_err');
const DuplicateError = require('../errors/duplicate_err');
const AuthError = require('../errors/auth_err');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUsersById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => new Error('Not Found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.message === 'Not Found') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(String(req.body.password), 10)
    .then((hashedPassword) => {
      User.create({
        name, about, avatar, email, password: hashedPassword,
      })
        .then((user) => res.status(201).send({ data: user }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные'));
          } else if (err.code === 11000) {
            next(new DuplicateError('Пользователь с таким email уже существует'));
          } else {
            next(err);
          }
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new AuthError('Необходимо авторизоваться');
    })
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const jwt = jsonWebToken.sign({ _id: user._id }, 'SECRET');
            res.cookie('jwt', jwt, {
              expiresIn: '7d',
              httpOnly: true,
              sameSite: true,
            });
            res.send({ data: user.toJSON() });
          } else {
            throw new AuthError('Необходимо авторизоваться');
          }
        })
        .catch(next);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.message === 'NotFound') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      } else {
        next(err);
      }
    });
};

// обновляет профиль
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.message === 'Not Found') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      } else {
        next(err);
      }
    });
};

// обновляет аватар
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.message === 'Not Found') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  login,
  getCurrentUser,
  updateProfile,
  updateAvatar,
};
