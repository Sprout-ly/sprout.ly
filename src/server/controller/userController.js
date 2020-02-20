const db = require('../models/dbModel');

const userController = {};


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

module.exports = userController;