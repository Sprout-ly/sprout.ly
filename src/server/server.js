/* eslint-disable consistent-return */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const plantController = require('./controller/plantController')
const userController = require('./controller/userController')
const PORT = 3030;
const GoogleAuth = require('google-auth-library')
const clientId = "1071619533746-68g7lhv0h6b1urgto5rak8cpk0orj929.apps.googleusercontent.com"

const app = express();
const client = new GoogleAuth.OAuth2Client(clientId)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/landing', plantController.getplantResults, (req, res) => {
  res.status(200).json(res.locals.plants);
});

app.get('/plants', plantController.getUserPlants, (req, res) => {
  res.status(200).json(res.locals.plants);
});

app.patch('/updateplants', plantController.updatePlant, (req, res) => {
  res.status(200).json(res.locals.updatedPlants);
});
app.delete('/deleteplants', plantController.deleteUserPlants, (req, res) => {
  res.status(200).json(res.locals.plants);
});

app.get('/authenticate', (req, res) => {
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: req.headers.authorization,
      audience: clientId,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];
    console.log("payload", payload);
    console.log("userID", userId)
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
  }
  verify().catch(console.error);

  console.log("reacehd authenticate")

  console.log(req.headers.authorization)
  res.sendStatus(222);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../display/index.html'));
});

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/bundle.js'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../display/index.html'));
});

// if you are in the page and you refresh, this will boot you back to the first page.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../display/index.html'));
});

// Test post request to confirm db is connected -> posted user info to db
app.post('/users', userController.postUser, (req, res) => {
  res.status(200).json();
});

app.post('/plants', plantController.addPlant, (req, res) => {
  res.sendStatus(200);
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