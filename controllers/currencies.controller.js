const { parseString } = require('xml2js');
const fs = require('fs');
const axios = require('axios');
const { get } = require('https');
const { error } = require('console');
const exp = require('constants');
const uploadData = require('../google');


async function getDataXml(req, res) {

    if (!req.session.user_id) {
        res.redirect('/v1/user/login')
    } else {
        axios.get(`https://www.bnr.ro/nbrfxrates.xml`)
            .then(response => {
                const xmlData = response.data;

                parseString(xmlData, async (parseError, result) => {
                    if (parseError) {
                        return res.status(404).json({
                            error: "Error parsing data"
                        })
                    }
                    let rates = result;
                    console.log(rates);
                    let currencies = [];
                    let data = rates['DataSet']['Body'][0]['Cube'][0]['Rate'];
                    data.forEach((rateEl) => {
                        const currency = rateEl.$.currency;
                        const parity = rateEl._;
                        currencies.push({ currency, parity })
                    })
                    return res.status(200).json(currencies);
                })
            })
            .catch(error => {
                res.status(404).json({
                    error: "Error fetching XML"
                })
            })

    }
}


async function getDataSpecificCurr(req, res) {
    if (!req.session.user_id) {
        res.redirect('/v1/user/login')
    } else {

        const { currencyName } = req.params;
        axios.get(`https://www.bnr.ro/nbrfxrates.xml`)
            .then(response => {
                const xmlData = response.data;

                parseString(xmlData, async (parseError, result) => {
                    if (parseError) {
                        return res.status(404).json({
                            error: "Error parsing data"
                        })
                    }
                    let rates = result;
                    console.log(rates);
                    let currencies = [];
                    let data = rates['DataSet']['Body'][0]['Cube'][0]['Rate'];
                    data.forEach((rateEl) => {
                        const currency = rateEl.$.currency;
                        const parity = rateEl._;
                        if (currency === currencyName) {
                            currencies.push({ currency, parity })
                            uploadData(currencies);
                            return res.status(200).json(currencies);
                        }

                    })

                })
            })
            .catch(error => {
                res.status(404).json({
                    error: "Error fetching XML"
                })
            })

    }
}
module.exports = { getDataXml, getDataSpecificCurr };