const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'Слишком короткое имя. Минимальная длина - 2 символа'],
      maxlength: [30, 'Слишком длинное имя. Максимальная длина - 30 символов'],
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: [2, 'Слишком короткое описание. Минимальная длина - 2 символа'],
      maxlength: [30, 'Слишком длинное описание. Минимальная длина - 30 символов'],
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'Укажите корректный адрес аватарки',
      },
    },
    email: {
      type: String,
      required: [true, 'Укажите e-mail'],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Укажите корректный e-mail',
      },
    },
    password: {
      type: String,
      required: [true, 'Укажите пароль'],
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
