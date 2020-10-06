'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json()); // creates http server

app.get('/receive-webhook', (req, res) => {
    console.log("SELAMAT ANDAR TELAH CONNECT");
});

app.post('/add-webhook', (req, res) => {
  console.log("SELAMAT ANDAR TELAH CONNECT");
});

app.listen(3000, () => console.log('[Testing] Webhook is listening'));