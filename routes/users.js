const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  findUsers,
  updateUserInfo,
  updateUserAvatar,
  findMe,
} = require('../controllers/users');

usersRouter.get('/', findUsers);
usersRouter.get('/me', findMe);
usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUserInfo,
);
usersRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().uri().required(),
    }),
  }),
  updateUserAvatar,
);

module.exports = usersRouter;
