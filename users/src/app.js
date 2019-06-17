var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var userRouter = require('./user/user.router');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json'}))

app.get('/', (req, res) => {
  res.json({ message: 'It works!!!' });
});

app.use('/api/users', userRouter);

module.exports = app;
