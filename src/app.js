const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { router } = require('./routes');

const { viewRouter } = require('./routes');

require('dotenv').config();

const { MONGODB_ADDRESS } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, './views/public')));
app.use('/', viewRouter);

mongoose.connect(MONGODB_ADDRESS);

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

app.use('/', router);

app.use((error, req, res, next) => {
  console.log(error);
  next();
});

module.exports = app;
