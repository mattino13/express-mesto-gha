const appRouter = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const authRouter = require('./auth');
const { authMiddleware } = require('../middlewares/auth');

appRouter.use('/', authRouter);

appRouter.use('/cards', authMiddleware, cardsRouter);
appRouter.use('/users', authMiddleware, usersRouter);

module.exports = appRouter;
