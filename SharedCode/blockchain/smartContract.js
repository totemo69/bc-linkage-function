const { web3 } = require('../misc/ethereum');
const { ActionTypes } = require('../misc/enum');
const Web3PromiEvent = require('web3-core-promievent');

const smartContract = (abi, scAddress, ownerAddress, privateKey, gas_limit) => {
  const _abi = abi;
  const _scAddress = scAddress;
  const _ownerAddress = ownerAddress;
  const _privateKey = privateKey;
  const _gas_limit = gas_limit;
  const _contract = new web3.eth.Contract(_abi, _scAddress);
  
  const balance = async (account) => {
    const result = await _contract.methods.balanceOf(account).call();
    return result;
  };

  const totalSupply = async () => {
    const result = await _contract.methods.totalSupply().call();
    return result;
  };

  const name = async () => {
    const result = await _contract.methods.name().call();
    return result;
  };

  const owner = async () => {
    const result = await _contract.methods.owner().call();
    return result;
  };

  const symbol = async () => {
    const result = await _contract.methods.symbol().call();
    return result;
  };

  const _signTransaction = async (data) => {
    const nonce  = await web3.eth.getTransactionCount(_ownerAddress, 'pending');
    const result = await web3.eth.accounts.signTransaction({
      nonce: web3.utils.toHex(nonce),
      to: _scAddress,
      value: '0x0',
      gas: web3.utils.toHex(_gas_limit.toString()),
      data: data
    }, _privateKey);
    return result;
  };

  const transactions = async (account, amount, actionTypes, recipient = null) => {
    return new Promise(async (resolve, reject) => {
      let encodedABI;
      try {
        switch(parseInt(actionTypes)) {
          case ActionTypes.AddPoints:
            encodedABI = _contract.methods.mint(account, amount).encodeABI();
            break;
          case ActionTypes.DeductPoints:
            encodedABI = _contract.methods.burn(account, amount).encodeABI();
            break;
          case ActionTypes.TransferPoints:
            encodedABI = _contract.methods.transfer(account, recipient, amount).encodeABI();
            break;
          default:
            throw new ApplicationError(ErrorCode.ApplicationError.A002);
        }
        const serializedTx = await _signTransaction(encodedABI);
        resolve(serializedTx);
      } catch (error) {
        reject(error);
      }
    });
  };

  const sendTransaction = (rawTransaction) => {
    const promiEvent = Web3PromiEvent();
    web3.eth.sendSignedTransaction(rawTransaction)
    .once('transactionHash', (hash) => {
      promiEvent.eventEmitter.emit('transactionHash', hash);
    })
    .once('receipt', (receipt) => {
      promiEvent.eventEmitter.emit('receipt', receipt);
     })
    .on('error', (error) => {
      promiEvent.eventEmitter.emit('error', error);
     })
    .then(function(receipt){
      promiEvent.resolve(receipt);
    })
    .catch(function(err){
      promiEvent.reject(err);
    });
    return promiEvent.eventEmitter;
  };

  return {
    transactions,
    sendTransaction,
    totalSupply,
    name,
    owner,
    symbol,
    balance,
  };
};

module.exports = smartContract;