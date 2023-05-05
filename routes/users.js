const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { urlRegex } = require('../utils/consts');
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
      userId: Joi.string().hex().required().length(24),
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
      avatar: Joi.string().required().pattern(new RegExp(urlRegex)),
    }),
  }),
  updateUserAvatar,
);

module.exports = usersRouter;
