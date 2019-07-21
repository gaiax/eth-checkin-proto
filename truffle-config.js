require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = process.env.MNEMONIC
const infuraKey = process.env.INFURA_API_KEY

module.exports = {

  networks: {

    development: {
      host: "127.0.0.1",     
      port: 7545,            
      network_id: "*",       
    },

    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/${infuraKey}`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },

  },

  contracts_directory: './src/contracts/',
  contracts_build_directory: `./src/abis/`,

  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
