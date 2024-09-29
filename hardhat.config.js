require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// 加载自定义任务
[
  "balance",
  "verify-contract",
  "network-info",
  "gas-price",
  "contract-interaction",
  "event-listener",
  "batch-transfer"
].forEach(taskName => require(`./tasks/${taskName}`));

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
};