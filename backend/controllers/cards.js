const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad_request_err');
const AccessDeniedError = require('../errors/access_denied_err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// удаление карточки
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Передан несуществующий _id карточки');
    })
    .then((card) => {
      if (String(card.owner) === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId).then(() => res.status(200).send(card));
      } else {
        throw new AccessDeniedError('Нет прав на удаление карточки');
      }
    })
    .catch(next);
};

// постановка лайка
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.message === 'Not Found') {
        next(new NotFoundError('Передан несуществующий _id карточки'));
      } else {
        next(err);
      }
    });
};

// удаление лайка
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.message === 'Not Found') {
        next(new NotFoundError('Передан несуществующий _id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
