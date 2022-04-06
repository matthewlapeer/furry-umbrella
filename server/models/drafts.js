const { Pool } = require('pg');
const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: 'postgres://hyqorqln:WRGZALRQrTXsvkepGcqpWAGkSDR-NYfG@batyr.db.elephantsql.com/hyqorqln'
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};

