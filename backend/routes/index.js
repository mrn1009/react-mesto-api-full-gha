const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const {
  validationLogin,
  validationCreateUser,
} = require('../middlewares/validations');
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

router.use('/signin', validationLogin, login);
router.use('/signup', validationCreateUser, createUser);
router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

module.exports = router;
