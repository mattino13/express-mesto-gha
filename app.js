const express = require('express');
const mongoose = require('mongoose');
const appRouter = require('./routes/index');
const { NOT_FOUND_HTTP_STATUS } = require('./utils/errors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64439adf69d3aa55e4c0298b',
  };

  next();
});

app.use('/', appRouter);
app.use('*', (req, res) => { res.status(NOT_FOUND_HTTP_STATUS).send({ message: 'Not implemented' }); });

app.listen(PORT, () => {
  console.log(`App starting on port ${PORT}`);
});
