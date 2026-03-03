// const { mysql } = require('pg');
// require('dotenv').config() 

// //Connect to Database
// const connection = new mysql({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   charset: 'utf8mb4'
// });

// console.log("Connected to Database successfully!");

// module.exports = connection;

const { Pool } = require("pg");
require('dotenv').config()

const connection = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = connection;
