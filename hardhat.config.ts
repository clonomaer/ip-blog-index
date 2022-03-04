import { HardhatConfig, NetworksConfig } from "hardhat/types";
import "@nomiclabs/hardhat-ethers";

import "@nomiclabs/hardhat-waffle";
import chai from "chai";
import chaiShallowDeepEqual from "chai-shallow-deep-equal";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiShallowDeepEqual);
chai.use(chaiAsPromised);

import dotenv from "dotenv";
import { DeepPartial } from "./types/utils";
import { randomPrivateKeys } from "./scripts/generate-accounts";
dotenv.config();

let gasPrice = 10000000000;
let blockGasLimit = 30000000;

const config: DeepPartial<
  Omit<HardhatConfig, "networks"> & { networks: NetworksConfig }
> = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      gasPrice,
      blockGasLimit,
      chainId: 56,
      accounts: [
        ...(process.env.MAIN_ACCOUNT_PK
          ? [
              {
                privateKey: process.env.MAIN_ACCOUNT_PK,
                balance: "1000000000000000000",
              },
            ]
          : []),
        ...randomPrivateKeys,
      ],
      mining: {
        auto: false,
        interval: 1000,
      },
    },
    local: {
      url: "http://127.0.0.1:8545",
      gasPrice,
      blockGasLimit,
      accounts: [
        ...(process.env.MAIN_ACCOUNT_PK ? [process.env.MAIN_ACCOUNT_PK] : []),
      ],
    },
    bsctest: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      gasPrice,
      blockGasLimit,
      accounts: [
        ...(process.env.MAIN_ACCOUNT_PK ? [process.env.MAIN_ACCOUNT_PK] : []),
      ],
    },
    bscmain: {
      url: "https://bsc-dataseed1.defibit.io",
      gasPrice: 5000000000,
      blockGasLimit,
      accounts: [
        ...(process.env.MAIN_ACCOUNT_PK ? [process.env.MAIN_ACCOUNT_PK] : []),
      ],
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
    ],
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

export default config;
