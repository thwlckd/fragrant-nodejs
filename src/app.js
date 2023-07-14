const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { getToken } = require('./middlewares');
const { router } = require('./routes');
const { errorLogger, errorHandler } = require('./middlewares');
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

app.use('/api', router);

app.use(errorLogger);
app.use((error, req, res, next) => {
  // 30~37 글씨 색상, 40~47 배경색
  console.log('\x1b[31m%s', error);
  res.status(400).json({ error: error.message });
  // error 발생시 error 페이지로 렌더해 에러 메세지를 띄워주면 좋을듯?
  // 공식 문서: https://expressjs.com/ko/guide/error-handling.html
  // res.render('error', { error: error.message }););
});

module.exports = app;
