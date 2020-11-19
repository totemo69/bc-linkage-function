const Queue = require('../SharedCode/models/queue');
const Transaction = require('../SharedCode/models/transaction');
const { StatusTypes, TransactionStatus } = require('../SharedCode/misc/enum');
const { abi } = require('../SharedCode/abi/Points.json');
const smartContract = require('../SharedCode/blockchain/smartContract');
const pointService = require('../SharedCode/service/points.service');
const queueService = require('../SharedCode/service/queue.service');

module.exports = async function (context, myTimer) {
  var timeStamp = new Date().toISOString();
  if (myTimer.IsPastDue)
  {
    context.log('JavaScript is running late!');
  }
  context.log('JavaScript timer trigger function ran!', timeStamp);
  //Get data for queue
  const queues = await Queue.findAll({
    where: {
      status: StatusTypes.Initial
    }
  });

  if (queues) {
    for (const queue of queues) {
      const { type, address, value, action, id } = queue;
      try {
        //Get type of points
        const details = await pointService().PointType(type);

        if (details) {
          //Set queue statuts to processing

          context.log('QueueData:', id, JSON.stringify(queue));
          queueService().updateStatus(id, StatusTypes.Processing);

          const points = smartContract(
            abi,
            details.contractAddress,
            details.ownerAddress,
            details.privateKey,
            details.gasLimit
          );

          //Execute smart contract transaction
          const signTransaction = await points.transactions(address,value,action);
          const txResult = new Promise((resolve, reject) => { 
            points.sendTransaction(signTransaction.rawTransaction)
            .on('transactionHash', (hash) => resolve(hash))
            .on('error', (error) => reject(error))
          });
          const hash = await txResult;
          context.log('QueueDataTx:', id, JSON.stringify(signTransaction));
          //Insert transaction result from blockchain into table
          const tx = await Transaction.create({
            queueId: id,
            transactionHash: hash,
            status: TransactionStatus.Submitted,
            value
          });
          context.log('TxData:', JSON.stringify(tx));
        } else {
          context.log.error('QueueData:', id, ErrorCode.ApplicationError.A001);
          throw new ApplicationError(ErrorCode.ApplicationError.A001);
        }
      } catch (error) {
        context.log.error('Queue:', id, error);
        queueService().updateStatus(id, StatusTypes.Error);
      }
    }
  }
};