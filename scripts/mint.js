require("dotenv").config();
const { ethers } = require("ethers");

// Load environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

if (!PRIVATE_KEY || !RPC_URL || !CONTRACT_ADDRESS) {
  throw new Error("Please set PRIVATE_KEY, RPC_URL, and CONTRACT_ADDRESS in the .env file");
}

// ABI of the MyNFT contract
const CONTRACT_ABI = [
  "function mintNFT(address recipient) public returns (uint256)",
  "function tokenCounter() public view returns (uint256)"
];

async function main() {
  // Connect to Neo X network
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  // Connect to the deployed MyNFT contract
  const myNFT = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

  // Specify recipient address
  const recipientAddress = "0xE78FD95780d54E63cC4c1D0Df7DbC4487a6C72D4"; // Replace with the recipient's address

  console.log("Minting NFT...");

  // Call mintNFT function
  const tx = await myNFT.mintNFT(recipientAddress, {
        gasLimit: 5000000, // Adjust the gas limit as needed
        maxPriorityFeePerGas: ethers.utils.parseUnits("20", "gwei"), // Minimum miner tip
        maxFeePerGas: ethers.utils.parseUnits("150", "gwei"), // Maximum gas fee
      });
  console.log("Transaction submitted:", tx.hash);

  // Wait for the transaction to be mined
  const receipt = await tx.wait();
  console.log("Transaction mined:", receipt.transactionHash);
}

main()
  .then(() => console.log("Minting complete!"))
  .catch((error) => {
    console.error("Error minting NFT:", error);
    process.exit(1);
  });