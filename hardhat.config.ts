import "@nomiclabs/hardhat-ethers";

import "@nomiclabs/hardhat-waffle";
import chai from "chai";
import chaiShallowDeepEqual from "chai-shallow-deep-equal";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiShallowDeepEqual);
chai.use(chaiAsPromised);

let gasPrice = 10000000000;
let blockGasLimit = 30000000;

export default {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      gasPrice,
      blockGasLimit,
      gas: "auto",
      mining: {
        auto: false,
        interval: 1000,
      },
    },
    local: {
      url: "http://127.0.0.1:8545",
      gasPrice,
      blockGasLimit,
    },
    bsctest: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      gasPrice,
      blockGasLimit,
    },
    bscmain: {
      url: "https://bsc-dataseed1.defibit.io",
      gasPrice: 5000000000,
      blockGasLimit,
    },
  },
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 200000,
  },
};
