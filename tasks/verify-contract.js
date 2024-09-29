const { task } = require("hardhat/config");

task("verify-contract", "在Etherscan上验证合约\n示例: npx hardhat verify-contract --contract 0x123456789abcdef --args arg1,arg2")
  .addParam("contract", "合约地址")
  .addParam("args", "构造函数参数，用逗号分隔")
  .setAction(async (taskArgs, hre) => {
    const args = taskArgs.args.split(',');
    await hre.run("verify:verify", {
      address: taskArgs.contract,
      constructorArguments: args,
    });
  });

module.exports = {};