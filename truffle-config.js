const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = "receive risk draw record wheel gentle benefit broccoli cruel net present topic";
const infuraKey = "8a14ab8fa23d435a83ff74fd3c98d27b"


module.exports = {

  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
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

  contracts_directory: './contracts/',
  contracts_build_directory: `./frontend/src/abis/`,

}
