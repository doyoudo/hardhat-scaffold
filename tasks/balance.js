const { task } = require("hardhat/config");

task("balance", "查询账户余额\n示例: npx hardhat balance --account 0x1991e11b5ab2e59a5f1279ea2588324acba47fca")
  .addParam("account", "账户地址")
  .setAction(async (taskArgs, hre) => {
    const balance = await hre.ethers.provider.getBalance(taskArgs.account);
    console.log(hre.ethers.formatEther(balance), "ETH");
  });

module.exports = {};