import hre from "hardhat";
import { expect } from "chai";
import { Content, IPBlogV1 } from "../contracts/ipblog-v1";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("IPBlog", function () {
  const sampleCID = "sampleCID";
  let ipblogV1: IPBlogV1,
    owner: SignerWithAddress | undefined,
    addr1: SignerWithAddress | undefined,
    addr2: SignerWithAddress | undefined,
    addr3: SignerWithAddress | undefined;

  before(async () => {
    [owner, addr1, addr2, addr3] = await hre.ethers.getSigners();

    const IPBlogV1Factory = await hre.ethers.getContractFactory("IPBlogV1");
    ipblogV1 = new IPBlogV1(await IPBlogV1Factory.deploy(), owner!);
  });
  it("Should list a new post", async () => {
    await expect(ipblogV1.publish(sampleCID)).not.to.be.reverted;
    const contents = await ipblogV1.getAllContents();
    expect(contents.length).to.be.greaterThan(0);
    expect(contents[0]!).to.eq(sampleCID);
  });
  it("Should return details of a post", async () => {
    const details = await ipblogV1.detailsOf(sampleCID);
    expect(details).to.be.instanceOf(Content);
    expect(details.author).to.be.equal(owner!.address);
  });
  it("Should not let author republish a content", async () => {
    await expect(ipblogV1.publish(sampleCID)).to.be.reverted;
  });
  it("Should not let someone else republish a content", async () => {
    ipblogV1.signer = addr1!;
    await expect(ipblogV1.publish(sampleCID)).to.be.reverted;
  });
  it("Should return the list of all posts", async () => {
    expect(await ipblogV1.getAllContents()).to.contain(sampleCID);
  });
  it("Should return the list of all authors", async () => {
    expect(await ipblogV1.getAllAuthors()).to.contain(owner!.address);
  });
});
