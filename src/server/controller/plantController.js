const db = require('../models/dbModel');

const plantController = {};

// handle post request from FE with searchtext
plantController.getplantResults = (req, res, next) => {
  const { plantName } = req.query;
  console.log('req.body search results', req.query);
  const newQuery =
    `SELECT * FROM plants WHERE plantname LIKE '%${plantName}%'`;
  db.query(newQuery)
    .then((data => {
      res.locals.plants = data.rows;
      return next();
    }))
    .catch(err => console.log(err))
};

plantController.getUserPlants = (req, res, next) => {
  const { user_id } = req.query;
  console.log('req.query search results', req.query);
  const newQuery =
    `SELECT * FROM plants WHERE user_id = ${user_id}`;
  db.query(newQuery)
    .then((data => {
      res.locals.plants = data.rows;
      return next();
    }))
    .catch(err => console.log(err))
};

// successfully posts info to db
plantController.postPlant = (req, res, next) => {
  const { user_id, plantname, waterschedule } = req.body;
  console.log('req.body', req.body)
  const newQuery =
    `INSERT INTO plants (user_id, plantname, waterschedule) VALUES ($1, $2, $3)`;
  const values = [user_id, plantname, waterschedule]
  db.query(newQuery, values)
    .then(data => console.log('sucessfully added plant', data))
    .catch(err => console.log('there was an error creating new plant'))
  return next();
};


module.exports = plantController;