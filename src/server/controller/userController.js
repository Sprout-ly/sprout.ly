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
  console.log("what")
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: authorization,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    console.log(payload);



    res.locals.userData = { name: payload.name, email: payload.email, u_id: payload.sub }
    next();
  }

  let { authorization, tokentype } = req.headers;

  if (tokentype === "Bearer") {
    verify().catch(err => next(err));
  }
}

userController.verifyOrWriteUser = (req, res, next) => {
  console.log("in verify and write");
  let values = [res.locals.userData.name, res.locals.userData.email, res.locals.userData.u_id];
  const query1 = `SELECT EXISTS(SELECT 1 FROM users WHERE g_id = ${payload.u_id})`;
  const query2 = `INSERT INTO user (name, email, g_id)
                  VALUES ($1, $2, $3)
                  RETURNING *`;
  const query3 = `SELECT * from users where googleId = ${payload.u_id}`;
  let exists;

  db.query(query1)
    .then(data => {
      console.log('query 1 data here', data);
      exists = data.rows[0].exists;
      console.log('exists boolean here', exists);
      if (exists === false) {
        db.query(query2, values)
          .then(data => {
            console.log('data rows here', data.rows);
            res.locals.users = data.rows;
            next();
          })
          .catch(err => console.log(err));
      } else {
        db.query(query3, values).then(data => {
          res.locals.users = data.rows;
          next();
        });
      }
    })
    .catch(err => {
      console.log(err)
      next(err)
    });
}



module.exports = userController;