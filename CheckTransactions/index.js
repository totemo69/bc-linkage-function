const Transaction = require('../SharedCode/models/transaction');
const Blocks = require('../SharedCode/blockchain/blocks');
const transactionService = require('../SharedCode/service/transaction.service');
const queueService = require('../SharedCode/service/queue.service');
const { StatusTypes, TransactionStatus } = require('../SharedCode/misc/enum');

module.exports = async function (context, myTimer) {
  var timeStamp = new Date().toISOString();
  
  if (myTimer.IsPastDue)
  {
    context.log('JavaScript is running late!');
  }
  context.log('JavaScript timer trigger function ran!', timeStamp);

  const transactions = await Transaction.findAll({
    where: {
      status: TransactionStatus.Submitted
    }
  });
  if (transactions) {
    for (const transaction of transactions) {
      const { id, queueId, transactionHash } = transaction;
      try {
        const receipt = await Blocks().getTransactionReceipt(transactionHash);
        if(receipt) {
          context.log('Transaction:', queueId, JSON.stringify(receipt));
          if (receipt.status == true) { 
            transactionService().updateStatus(id, TransactionStatus.Sucess)
            queueService().updateStatus(queueId, StatusTypes.Completed);
          } else {
            transactionService().updateStatus(id, TransactionStatus.Fail)
            queueService().updateStatus(queueId, StatusTypes.Error);
          }
        }
      } catch (error) {
        context.log.error('Transaction:', id, error);
        queueService().updateStatus(id, StatusTypes.Error);
        transactionService().updateStatus(id, TransactionStatus.Error);
      }
    }
  }
};