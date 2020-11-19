const Sequelize = require('sequelize');
const sequelize = require('../misc/database');

const tableName = 'transactions';

const Transactions = sequelize.define('Transactions', {
  queueId: {
    type: Sequelize.STRING,
    unique: true,
  },
  transactionHash: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
  },
}, { tableName });

// eslint-disable-next-line
Transactions.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Transactions;