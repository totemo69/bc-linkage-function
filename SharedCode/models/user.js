const Sequelize = require('sequelize');
const sequelize = require('../misc/database');

const tableName = 'users';

const User = sequelize.define('User', {
  userId: {
    type: Sequelize.STRING,
    unique: true,
  },
  walletAddress: {
    type: Sequelize.STRING,
  },
  privateKey: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
}, { tableName });

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = User;