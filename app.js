const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const appRouter = require('./routes/index');

const { NOT_FOUND_HTTP_STATUS, handleServerError } = require('./utils/errors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', appRouter);
app.use('*', (req, res) => { res.status(NOT_FOUND_HTTP_STATUS).send({ message: 'Not implemented' }); });

app.use(errors());

app.use((error, req, res, next) => {
  handleServerError(error, res);
});

app.listen(PORT, () => {
  console.log(`App starting on port ${PORT}`);
});
