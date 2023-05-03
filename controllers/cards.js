const Card = require('../models/card');
const { NotFoundError, ForbiddenError } = require('../utils/errors');

function findCards(req, res, next) {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
}

function createCard(req, res, next) {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  })
    .then((card) => {
      card.populate(['owner', 'likes'])
        .then((result) => res.status(201).send(result))
        .catch(next);
    })
    .catch(next);
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
          .then(() => res.send({ message: 'Карточка удалена' }))
          .catch(next);
      } else {
        throw new ForbiddenError('Удалять чужие карточки запрещено');
      }
    })
    .catch(next);
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .populate(['owner', 'likes'])
    .then((card) => res.status(201).send(card))
    .catch(next);
}

function resetLikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(next);
}

module.exports = {
  findCards, createCard, deleteCard, likeCard, resetLikeCard,
};
