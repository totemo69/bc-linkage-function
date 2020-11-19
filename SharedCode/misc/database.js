const Sequelize = require('sequelize');

const { connection }  = require('./connection');

let database = new Sequelize(
  connection.database,
  connection.username,
  connection.password, {
    host: connection.host,
    dialect: connection.dialect,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  },
);

module.exports = database;