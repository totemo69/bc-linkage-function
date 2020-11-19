const ActionTypes = {
  AddPoints: 1,
  DeductPoints: 2,
  TransferPoints: 3,
};

const StatusTypes = {
  Initial: 1,
  Processing: 2,
  Completed: 3,
  Error: 4,
  Pending: 5,
};

const TransactionStatus = {
  Submitted: 1,
  Sucess: 2,
  Fail: 3,
  Pending: 3,
  Error: 4,
};

module.exports = {
  ActionTypes,
  StatusTypes,
  TransactionStatus,
};