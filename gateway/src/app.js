var express = require('express');
var bodyParser = require('body-parser');
var { catchAll, notFound } = require('./error');
var usersRouter = require('./users/users.router');
var productsRouter = require('./products/products.router');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'GATEWAY!' });
});

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

app.use(notFound);
app.use(catchAll);

module.exports = app;
