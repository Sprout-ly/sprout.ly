/* eslint-disable consistent-return */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 3030;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  console.log("WHAT")
  res.sendStatus(222);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../display/index.html'));
});

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/bundle.js'));
});



// if you are in the page and you refresh, this will boot you back to the first page.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../display/index.html'));
});


app.use('*', (req, res) => {
  res.sendStatus(404);
});

// global error handler
// eslint-disable-next-line consistent-return
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.log(err)
  res.sendStatus(500);
}

app.listen(PORT);
console.log((`app listening on ${PORT}`));

module.exports = {
  app
};