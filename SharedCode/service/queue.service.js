const Queue = require('../models/queue');
const { ApplicationError } = require('../misc/baseError');
const ErrorCode = require('../misc/errorCode');

const queue = () => {
  const updateStatus = async (queueId, status) => {
    try {
      const queue = await Queue.findByPk(queueId);
      if(!queue) {
        throw new ApplicationError(ErrorCode.ApplicationError.A004);
      }
      queue.update({status});
    } catch (error) {
      throw new ApplicationError(error);
    }
  }
  return {
    updateStatus,
  }
};

module.exports = queue;