const router = require('express').Router();

const {
  validationUpdateProfile,
  validationUpdateAvatar,
  validationUsersId,
} = require('../middlewares/validations');

const {
  getUsers,
  getUsersById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validationUsersId, getUsersById);
router.patch('/me', validationUpdateProfile, updateProfile);
router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
