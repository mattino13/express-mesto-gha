const appRouter = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

appRouter.use('/cards', cardsRouter);
appRouter.use('/users', usersRouter);

module.exports = appRouter;
