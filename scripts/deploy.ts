import hre from "hardhat";
import { readFile, writeFile, mkdir, stat } from "fs/promises";
import path from "path";

async function main() {
  const [deployer, ...rest] = await hre.ethers.getSigners();
  if (deployer === undefined) {
    throw new Error("Missing signer");
  }
  console.log("Deploying contracts with the account: ", deployer.address);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  const contractKey = "IPBlogV1";

  const IPBlogV1Factory = await hre.ethers.getContractFactory(contractKey);
  const ipblogV1 = await IPBlogV1Factory.deploy();
  console.log("Deployed successfully at: ", ipblogV1.address);

  const abi = JSON.parse(
    (
      await readFile(
        path.join(
          __dirname,
          "..",
          "artifacts",
          "contracts",
          `${contractKey}.sol`,
          `${contractKey}.json`
        )
      )
    ).toString()
  ).abi;
  try {
    await stat(path.join(__dirname, "..", "deployments"));
  } catch {
    await mkdir(path.join(__dirname, "..", "deployments"));
  }
  try {
    await stat(path.join(__dirname, "..", "deployments", hre.network.name));
  } catch {
    await mkdir(path.join(__dirname, "..", "deployments", hre.network.name));
  }
  await writeFile(
    path.join(
      __dirname,
      "..",
      "deployments",
      hre.network.name,
      `${contractKey}.json`
    ),
    JSON.stringify({ address: ipblogV1.address, abi })
  );
  console.log("Deployment info successfully written!");
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
