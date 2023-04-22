const usersRouter = require('express').Router();
const {
  findUsers, findUserById, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/users', findUsers);
usersRouter.post('/users', createUser);
usersRouter.get('/users/:userId', findUserById);
usersRouter.patch('/users/me', updateUser);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRouter;
