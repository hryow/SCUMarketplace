/* Connects to PostgreSQL database using connection pool
 Imports the Pool class from the 'pg' package to manage PostgreSQL connections
*/

const { Pool } = require('pg');

// Loads the environment variables from the .env file for sensitive info like DB credentials
require('dotenv').config();

/*
Creates a new connection pool to the PostgreSQL database
and a pool manages multiple database connections efficiently
*/

/*
const pool = new Pool({
  user: process.env.DB_USER,         //db username
  host: process.env.DB_HOST,         //db host
  database: process.env.DB_NAME,     // name of db
  password: process.env.DB_PASSWORD, //password
  port: process.env.DB_PORT,         // port #
});
*/

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10), // convert string to number
});


// Need to export the pool to be imported and used in controller.js
module.exports = pool; 
