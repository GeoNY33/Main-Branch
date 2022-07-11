const { Pool } = require('pg');

// Check the readme on how to create your own database
const PG_URI = 'postgres://ulawlszb:1BkYhD2X5umXY-lrk5QteoPvbRUDcnwu@chunee.db.elephantsql.com/ulawlszb';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};