const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../utils/sercetKey');
const { CREATED_HTTP_STATUS } = require('../utils/consts');

const User = require('../models/user');
const { NotFoundError, UnauthorizedError } = require('../utils/errors');

function findUsers(req, res, next) {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
}

function findUserByIdCore(res, next, userId) {
  User.findById(userId)
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.send(user))
    .catch(next);
}

function findUserById(req, res, next) {
  findUserByIdCore(res, next, req.params.userId);
}

function findMe(req, res, next) {
  findUserByIdCore(res, next, req.user._id);
}

function generateToken(payload) {
  return jwt.sign(payload, jwtSecretKey, { expiresIn: '7d' });
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные e-mail или пароль'));
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return Promise.reject(new UnauthorizedError('Неправильные e-mail или пароль'));
      }

      const token = generateToken({ _id: user._id });
      res.cookie('jwt', token, { httpOnly: true });
      res.send({ success: true });
      // для того, чтобы ушла ошибка linter 'consistent-return'
      return Promise.resolve();
    })
    .catch(next);
}

function createUser(req, res, next) {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  User.create({
    name,
    about,
    avatar,
    email,
    password: hashedPassword,
  })
    .then((user) => {
      const {
        _id,
        name: n,
        about: ab,
        avatar: av,
        email: e,
      } = user;

      res.status(CREATED_HTTP_STATUS).send(
        {
          _id,
          name: n,
          about: ab,
          avatar: av,
          email: e,
        },
      );
    })
    .catch(next);
}

function updateUser(req, res, next, userData) {
  User.findByIdAndUpdate(req.user._id, userData, { new: true, runValidators: true })
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.send(user))
    .catch(next);
}

function updateUserInfo(req, res, next) {
  const { name, about } = req.body;
  updateUser(req, res, next, { name, about });
}

function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;
  updateUser(req, res, next, { avatar });
}

module.exports = {
  findUsers,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  findUserById,
  findMe,
};
