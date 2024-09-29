const { task } = require("hardhat/config");

task("network-info", "显示网络信息\n示例: npx hardhat network-info")
  .setAction(async (_, hre) => {
    const chainId = await hre.ethers.provider.getNetwork().then(n => n.chainId);
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`链ID: ${chainId}`);
    console.log(`当前区块号: ${blockNumber}`);
  });

module.exports = {};