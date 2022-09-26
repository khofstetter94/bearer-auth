'use strict';

const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3002;

// we'll use this for inclass-demo.  one big monolithic file  
const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory' // two colons allows for NO persistance
  : 'sqlite:memory';  // one colon allows us to persist

// something like this will be used in your ACTUAL project:  
// const DATABASE_URL = process.env.NODE_ENV === 'test'
//   ? 'sqlite::memory'
//   : process.env.DATABASE_URL;

// instantiate database
const sequelizeDatabase = new Sequelize(DATABASE_URL);

// use middleware to Allow us to access request body json

// use middleware to Process FORM input and add to request body

// Create a Sequelize Model

// Attach beforeCreate Hook to the UserModel.  

// Define basicAuth Middleware. 
// Implement on basic-auth-secured routes only. ie.  the '/signin' or '/hello' route
// TODO:
// 1. confirm request header has an "authorization" property
// 2. Parse the basic auth string
// 3. find the user in the database
// 4. IF the user exists (in database after a signup request)...
// 5. compare  password from database to the signin password 
// 5a.  note: password could also be sent from a logged in client 
// 6. if valid user DOES exist... 
// 7. attach user to request object
// 8. basicAuth middleware is done, pass request to next middleware
// 9. if valid user DOES NOt exist...
// 10. send a "Not Authorized" error to express middleware


// define a signup route to Create new user in database

//define a signin route to Returns user object to client (confirm user auth)

// define a hello route that uses basic auth to safeguard response content

// export app for testing, start ability to run app, and our db with ORM
module.exports = {
  server: app,
  start: () => app.listen(PORT, console.log('server running on', PORT)),
  sequelizeDatabase,
};
