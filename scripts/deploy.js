const hre = require("hardhat");

async function main() {
  const Oasis_NFTMarketplace = await hre.ethers.getContractFactory(
    "Oasis_NFTMarketplace"
  );
  const oasis_NFTMarketplace = await Oasis_NFTMarketplace.deploy();
  await oasis_NFTMarketplace.deployed();
  console.log(`Contract address: ${oasis_NFTMarketplace.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
