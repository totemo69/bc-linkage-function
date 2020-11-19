const Web3 = require('web3');

const ethereum = {
  web3: new Web3(new Web3.providers.HttpProvider(process.env.RPC_PROVIDER))
};

module.exports =  ethereum;