const authRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser, login } = require('../controllers/users');

authRouter.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required()
        .email()
        .min(2)
        .max(30),
      password: Joi.string().required(),
    }),
  }),
  login,
);

authRouter.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[a-z0-9-]+\.[a-z]+[a-z0-9-._~:/?#\[\]@!$&'()*\+,;=]*#?$/i),
      email: Joi.string().required()
        .email()
        .min(2)
        .max(30),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

module.exports = authRouter;
