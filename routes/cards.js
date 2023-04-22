const cardsRouter = require('express').Router();
const {
  findCards, createCard, deleteCard, likeCard, resetLikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', findCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', deleteCard);

cardsRouter.put('/cards/:cardId/likes', likeCard);
cardsRouter.delete('/cards/:cardId/likes', resetLikeCard);

module.exports = cardsRouter;
