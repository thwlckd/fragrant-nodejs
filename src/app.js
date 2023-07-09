const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { getToken } = require('./middlewares');
const { router } = require('./routes');

const { viewRouter } = require('./routes');

require('dotenv').config();
require('./passport')();

const { MONGODB_ADDRESS } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // cookie-parser는 요청과 함께 들어온 쿠키를 해석하여 req.cookies객체로 만들어줌
app.use(passport.initialize());
app.use(getToken);

app.use('/', express.static(path.join(__dirname, './views/public')));
app.use('/', viewRouter);

mongoose.connect(MONGODB_ADDRESS);

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

app.use('/', router);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(400).end()
});

module.exports = app;
