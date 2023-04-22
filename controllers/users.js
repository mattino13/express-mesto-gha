const User = require('../models/user');
const { handleHTTPError, NotFoundError } = require('../utils/errors');

function findUsers(req, res) {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleHTTPError(err, res));
}

function findUserById(req, res) {
  User.findById(req.params.userId)
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.send(user))
    .catch((err) => handleHTTPError(err, res));
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => handleHTTPError(err, res));
}

function updateUser(req, res) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.send(user))
    .catch((err) => handleHTTPError(err, res));
}

function updateUserAvatar(req, res) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.send(user))
    .catch((err) => handleHTTPError(err, res));
}

module.exports = {
  findUsers, findUserById, createUser, updateUser, updateUserAvatar,
};
