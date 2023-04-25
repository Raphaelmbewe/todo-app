const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD, //PLEASE USE THE PASSWORD YOU ENTERED WHEN INSTALLING POSTGRES
  database: process.env.DATABASE,
  ssl:false
});

module.exports = pool;
