const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Укажите название места'],
    minlength: [2, 'Минимальная длина поля "название" - 2'],
    maxlength: [30, 'Максимальная длина поля "название" - 30'],
  },
  link: {
    type: String,
    required: [true, 'Укажите ссылку на изображение'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
