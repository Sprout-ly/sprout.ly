const db = require('../models/dbModel');

const userController = {};

const GoogleAuth = require('google-auth-library')
const clientId = "1071619533746-68g7lhv0h6b1urgto5rak8cpk0orj929.apps.googleusercontent.com"

const client = new GoogleAuth.OAuth2Client(clientId)



// create user
userController.postUser = (req, res, next) => {
  const { g_id, email, name } = req.body;
  const newQuery =
    `INSERT INTO users (g_id, email, name) VALUES (104351432, 'linda@awesome.com', 'leeeenda')`;
  // const values = [g_id, email, name]
  db.query(newQuery)
    .then(data => console.log('sucessfully created user', data))
    .catch(err => console.log('there was an error creating new user'))
  return next();
};


//google Oauth User
userController.oAuthUser = (req, res, next) => {
  console.log("in oauth")
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: authorization,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    res.locals.userData = {name: payload.name, email: payload.email, u_id : 1}
    next();
  }

  let { authorization, tokentype } = req.headers;

  if (tokentype === "Bearer") {
    verify().catch(err => next(err));
  }
}

module.exports = userController;