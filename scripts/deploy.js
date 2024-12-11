const hre = require("hardhat");

async function main() {
    const NeoxNFT = await hre.ethers.getContractFactory("NeoxNFT");
    const neoxNFT = await NeoxNFT.deploy(); // No arguments needed here
    await neoxNFT.deployed();

    console.log("NeoxNFT deployed to:", neoxNFT.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});