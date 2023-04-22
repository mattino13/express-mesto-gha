const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Укажите имя пользователя'],
      minlength: [2, 'Слишком короткое имя. Минимальная длина - 2 символа'],
      maxlength: [30, 'Слишком длинное имя. Максимальная длина - 30 символов'],
    },
    about: {
      type: String,
      required: [true, 'Укажите описание пользователя'],
      minlength: [2, 'Слишком короткое описание. Минимальная длина - 2 символа'],
      maxlength: [30, 'Слишком длинное описание. Минимальная длина - 30 символов'],
    },
    avatar: {
      type: String,
      required: [true, 'Укажите аватар пользователя'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
