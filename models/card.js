const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Укажите название карточки'],
      minlength: [2, 'Слишком короткое название. Минимальная длина - 2 символа'],
      maxlength: [30, 'Слишком длинное название. Максимальная длина - 30 символов'],
    },

    link: {
      type: String,
      required: [true, 'Укажите ссылку на карточку'],
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'Укажите корректную ссылку на карточку',
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    likes: {
      type:
        [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        }],
      default: [],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
