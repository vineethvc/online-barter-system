const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { catchAll, notFound } = require('./error');
const usersRouter = require('./users/users.router');
const productsRouter = require('./products/products.router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'GATEWAY!' });
});

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

app.use(notFound);
app.use(catchAll);

module.exports = app;
