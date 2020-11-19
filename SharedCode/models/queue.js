const Sequelize = require('sequelize');
const sequelize = require('../misc/database');
const { StatusTypes } = require('../misc/enum');

const tableName = 'queues';

const Queue = sequelize.define('Queue', {
  userId: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
  action: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  value: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: StatusTypes.Initial
  },
}, { tableName });

// eslint-disable-next-line
Queue.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Queue;
