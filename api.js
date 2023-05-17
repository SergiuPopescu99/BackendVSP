const express = require('express');

const currenciesRouter = require('./routes/currencies.router');
const userRouter = require('./routes/user.router');
const api = express.Router();
api.use('/currencies', currenciesRouter);
api.use('/user', userRouter);
module.exports = api;