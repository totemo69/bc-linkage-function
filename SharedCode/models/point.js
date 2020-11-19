const Sequelize = require('sequelize');
const sequelize = require('../misc/database');

const tableName = 'points';

const Point = sequelize.define('Point', {
  type: {
    type: Sequelize.STRING,
    unique: true,
  },
  contractAddress: {
    type: Sequelize.STRING,
  },
  ownerAddress: {
    type: Sequelize.STRING,
  },
  privateKey: {
    type: Sequelize.STRING,
  },
  gasLimit: {
    type: Sequelize.INTEGER,
    defaultValue: 4100000
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
}, { tableName });

// eslint-disable-next-line
Point.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Point;