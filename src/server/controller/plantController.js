const db = require('../models/dbModel');

const plantController = {};

// handle post request from FE with searchtext
plantController.getplantResults = (req, res, next) => {
  const { plantName } = req.query;
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
  const { user_id, plantname, waterschedule, lastwatered, nextwatering } = req.body;
  console.log('req.body', req.body)
  const newQuery =
    `INSERT INTO plants (user_id, plantname, waterschedule, lastwatered, nextwatering) VALUES ($1, $2, $3, $4, $5)`;
  const values = [user_id, plantname, waterschedule, lastwatered, nextwatering]
  db.query(newQuery, values)
    .then(data => console.log('sucessfully added plant'))
    .catch(err => console.log('there was an error creating new plant'))
  return next();
};


module.exports = plantController;