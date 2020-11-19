const Transaction = require('../models/transaction');
const { ApplicationError } = require('../misc/baseError');
const ErrorCode = require('../misc/errorCode');

const transaction = () => {
  const updateStatus = async (transanctionId, status) => {
    try {
      const transaction = await Transaction.findByPk(transanctionId);
      if(!transaction) {
        throw new ApplicationError(ErrorCode.ApplicationError.A003);
      }
      transaction.update({ status });
    } catch (error) {
      throw new ApplicationError(error);
    }
  }
  return {
    updateStatus,
  }
};

module.exports = transaction;