const Card = require('../models/card');
const { handleHTTPError, NotFoundError } = require('../utils/errors');

function findCards(req, res) {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((err) => handleHTTPError(err, res));
}

function createCard(req, res) {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
    likes: [],
    createdAt: new Date(),
  })
    .then((card) => {
      card.populate(['owner', 'likes'])
        .then((result) => res.status(201).send(result))
        .catch((err) => handleHTTPError(err, res));
    })
    .catch((err) => handleHTTPError(err, res));
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => handleHTTPError(err, res));
}

function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .populate(['owner', 'likes'])
    .then((card) => res.status(201).send(card))
    .catch((err) => handleHTTPError(err, res));
}

function resetLikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch((err) => handleHTTPError(err, res));
}

module.exports = {
  findCards, createCard, deleteCard, likeCard, resetLikeCard,
};
