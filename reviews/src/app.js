const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const reviewRouter = require('./review/review.router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'It works!!!' });
});

app.use('/api/reviews', reviewRouter);

module.exports = app;
