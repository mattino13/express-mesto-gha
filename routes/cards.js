const cardsRouter = require('express').Router();
const {
  findCards, createCard, deleteCard, likeCard, resetLikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', findCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);

cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', resetLikeCard);

module.exports = cardsRouter;
