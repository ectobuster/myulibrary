// db.js
const { Pool } = require('pg');

const connectionString = 'postgresql://myulibrary_owner:jJV0GuTwt4Zs@ep-weathered-base-a5zjnh6a.us-east-2.aws.neon.tech/myulibrary?sslmode=require';

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = pool;

