// dbModel.js is where we connect our db to our backend. 
// pool and connectionString allows for this to happen

const { Pool } = require('pg');

const PG_URI = 'postgres://hojkrszr:qQMUwc2ZIGvgWla5xzNAHBzsQyvu-rJc@rajje.db.elephantsql.com:5432/hojkrszr';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});


module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
}