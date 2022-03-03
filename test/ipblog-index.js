const hre = require("hardhat");

const ethers = require("ethers");
const { expect } = require("chai");
const { formatBytes32String } = require("@ethersproject/strings");
const waitFor = require("../utils/waitFor");

describe("IPBlog", function () {
  let ipblogIndex, owner, addr1, addr2, addr3;

  before(async () => {
    [owner, addr1, addr2, addr3] = await hre.ethers.getSigners();

    const IpblogIndex = await hre.ethers.getContractFactory("ipblog-index");
    ipblogIndex = await IpblogIndex.deploy();
  });
});
