const { task } = require("hardhat/config");

task("gas-price", "显示当前gas价格\n示例: npx hardhat gas-price")
  .setAction(async (_, hre) => {
    const gasPrice = await hre.ethers.provider.getGasPrice();
    console.log(`当前gas价格: ${hre.ethers.formatUnits(gasPrice, "gwei")} gwei`);
  });

module.exports = {};