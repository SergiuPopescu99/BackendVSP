const express = require('express');

const currenciesRouter = require('./routes/currencies.router');
const api = express.Router();
api.use('/currencies', currenciesRouter);

module.exports = api;