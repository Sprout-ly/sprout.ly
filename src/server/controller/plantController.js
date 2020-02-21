const db = require('../models/dbModel');

const plantController = {};

// handle post request from FE with searchtext
plantController.getplantResults = (req, res, next) => {
  const { plantName } = req.query;
  const newQuery =
    `SELECT * FROM plants WHERE plantname LIKE '%${plantName}%'`;
  db.query(newQuery)
    .then((data => {
      const result = data.rows;
      console.log(data.rows)
      res.locals.plants = data.rows;
      return next();
    }))
    .catch(err => console.log(err))
};

// get plant list by user
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
plantController.addPlant = (req, res, next) => {
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

// delete plant tied to user
plantController.deleteUserPlants = (req, res, next) => {
  const { user_id, plant_id } = req.body;
  const newQuery =
    `DELETE FROM plants WHERE user_id = ${user_id} AND plant_id = ${plant_id}`;
  db.query(newQuery)
    .then((data => {
      console.log('in delete', data)
      const updatedQuery =
        `SELECT * FROM plants WHERE user_id = ${user_id}`;
      db.query(updatedQuery)
        .then((data => {
          res.locals.plants = data.rows;
          return next();
        }))
        .catch(err => console.log(err))
    }))
    .catch(err => console.log(err, 'there was an error deleting your plant'))
}

// update plant info by user 
plantController.updatePlant = (req, res, next) => {
  const { plant_id, user_id, plantname, waterschedule, lastwatered } = req.body;
  console.log("in update", req.body)
  const newQuery =
    `UPDATE plants SET plantname = '${plantname}', waterschedule = ${waterschedule}, lastwatered = '${lastwatered}' WHERE user_id = ${user_id} AND plant_id = ${plant_id} `;
  db.query(newQuery)
    .then((data => {
      res.locals.updatedPlants = data.rows;
      return next();
    }))
    .catch(err => console.log(err, 'unable to update plants, please try again'))
}


module.exports = plantController;