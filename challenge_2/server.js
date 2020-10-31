const express = require('express');
const path = require('path');
const http = require('axios');
const moment = require('moment');
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

const endDate = moment().format('YYYY-MM-DD');
const bpiEndpoint = 'https://api.coindesk.com/v1/bpi/historical/close.json';
const cpEndpoint = 'https://api.coindesk.com/v1/bpi/currentprice.json';

app.get('/bpi', (req, res) => {
  http.get(`${bpiEndpoint}?start=2020-08-01&end=${endDate}`)
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => console.err('Error getting the response from the coin desk server'));
});

app.get('/cp', (req, res) => {
  http.get(`${cpEndpoint}`)
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => console.err('Error getting the response from the coin desk server'));
});

app.listen(PORT, () => {
  console.log(`*** Server listening on port http://localhost:${PORT} ***`);
});
