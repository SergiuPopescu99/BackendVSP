const express = require('express');
const api = require('./api');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
mongoose.connect('mongodb://127.0.0.1:27017/authDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!")

    })
    .catch(err => {

        console.log('ERROR:')
        console.log(err)
    })

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret' }))
app.use('/v1', api);

module.exports = app;