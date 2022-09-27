'use strict';

// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
const { Sequelize, DataTypes } = require('sequelize');

// we'll use this for inclass-demo.  one big monolithic file  
const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory' // two colons allows for NO persistance
  : 'sqlite:memory';  // one colon allows us to persist - useful today

// something like this will be used in your ACTUAL project:  
// const DATABASE_URL = process.env.NODE_ENV === 'test'
//   ? 'sqlite::memory'
//   : process.env.DATABASE_URL;

let options = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  },
} : {};

// instantiate database
const sequelizeDatabase = new Sequelize(DATABASE_URL, options);

// Create a Sequelize Model
const UsersModel = sequelizeDatabase.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Attach beforeCreate Hook to the UserModel.  
UsersModel.beforeCreate((user) => {
  console.log('our user', user);
});

module.exports = {
  UsersModel,
  sequelizeDatabase,
};
