const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  findUsers,
  updateUserInfo,
  updateUserAvatar,
  findUserById,
  findMe,
} = require('../controllers/users');

usersRouter.get('/', findUsers);
usersRouter.get('/me', findMe);
usersRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24),
    }),
  }),
  findUserById,
);

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
      avatar: Joi.string().required().pattern(/^https?:\/\/(www\.)?[a-z0-9-]+\.[a-z]+[a-z0-9-._~:/?#\[\]@!$&'()*\+,;=]*#?$/i),
    }),
  }),
  updateUserAvatar,
);

module.exports = usersRouter;
