const usersRouter = require('express').Router();
const {
  findUsers, findUserById, createUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', findUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:userId', findUserById);
usersRouter.patch('/me', updateUserInfo);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
