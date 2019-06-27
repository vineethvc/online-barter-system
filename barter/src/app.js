const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const barterRouter = require('./barter/barter.router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'It works!!!' });
});

app.use('/api/barter', barterRouter);

module.exports = app;
