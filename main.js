const express = require('express');
const { addTransaction, getPayerDetails, spendPoints } = require('./global.js');

const port = 3000;
const app = express();
app.use(express.json());

app.post('/add', addTransaction);
app.post('/spend', spendPoints);
app.get('/balance', getPayerDetails);

module.exports = app
