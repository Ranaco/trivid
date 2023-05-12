require("dotenv").config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;
require("ts-node").register({
  files: true,
});

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    hyperspace: {
      provider: () =>
        new HDWalletProvider(
          PRIVATE_KEY,
          "wss://wss.hyperspace.node.glif.io/apigw/lotus/rpc/v1"
        ),
      network_id: 3141,
      confirmations: 2,
      timeoutBlocks: 300,
      // gas: 4700036,
      skipDryRun: false,
    },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.19", // Fetch exact version from solc-bin (default: truffle's version)
      // }
    },
  },
  contracts_build_directory: "./client/build/",
  plugins: ["truffle-plugin-typescript"],
};
