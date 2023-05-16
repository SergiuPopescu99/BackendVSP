const express = require('express');
const currenciesRouter = express.Router();
const { getDataXml } = require('../controllers/currencies.controller')
const { getDataSpecificCurr } = require('../controllers/currencies.controller');

currenciesRouter.get('/', getDataXml);
currenciesRouter.get('/:currencyName', getDataSpecificCurr);

module.exports = currenciesRouter;