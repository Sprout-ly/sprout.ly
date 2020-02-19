const db = require('../models/dbModel');

const plantController = {};

// test to see if db is connected 
plantController.postUser = (req, res, next) => {
  const { username, password } = req.body;
  const newQuery =
    `INSERT INTO users (username, password) VALUES ($1, $2)`;

  const values = [username, password]
  db.query(newQuery, values)
    .then(data => console.log('sucessfully created user', data))
    .catch(err => console.log('there was an error creating new user'))
  return next();
};


module.exports = plantController;