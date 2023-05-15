const express = require('express');
const xml2js = require('xml2js');
const app = express();

const PORT = 9090;


app.listen(PORT, () => {
    console.log('Listening on port 9090');
})