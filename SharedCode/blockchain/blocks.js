const { web3 } = require('../misc/ethereum');

const blocks = () => {

  const getBlock = async (blockNumber) => {
    return new Promise((resolve, reject) => {
      web3.eth.getBlock(blockNumber, (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  const getTransaction = async (txHash) => {
    return new Promise((resolve, reject) => {
      web3.eth.getTransaction(txHash, (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  const getTransactionReceipt = async (txHash) => {
    return new Promise((resolve, reject) => {
      web3.eth.getTransactionReceipt(txHash, (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  return {
    getBlock,
    getTransaction,
    getTransactionReceipt
  };
};

module.exports = blocks;