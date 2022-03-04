import hre from "hardhat";
async function main() {
  const [deployer, ...rest] = await hre.ethers.getSigners();
  if (deployer === undefined) {
    throw new Error("Missing signer");
  }
  console.log("Deploying contracts with the account: ", deployer.address);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  const IPBlogV1Factory = await hre.ethers.getContractFactory("IPBlogV1");
  const ipblogV1 = await IPBlogV1Factory.deploy();
  console.log("Deployed successfully at: ", ipblogV1.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
