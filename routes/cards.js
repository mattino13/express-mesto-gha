const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  findCards, createCard, deleteCard, likeCard, resetLikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', findCards);

cardsRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(/^https?:\/\/(www\.)?[a-z0-9-]+\.[a-z]+[a-z0-9-._~:/?#\[\]@!$&'()*\+,;=]*#?$/i),
    }),
  }),
  createCard,
);

cardsRouter.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteCard,
);

cardsRouter.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  likeCard,
);

cardsRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  resetLikeCard,
);

module.exports = cardsRouter;
