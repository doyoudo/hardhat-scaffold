const { task } = require("hardhat/config");

task("contract-interaction", "与合约交互\n示例: npx hardhat contract-interaction --contract 0x123456789abcdef --method getValue")
  .addParam("contract", "合约地址")
  .addParam("method", "调用的方法名")
  .addOptionalParam("args", "方法参数，用逗号分隔")
  .setAction(async (taskArgs, hre) => {
    const contractFactory = await hre.ethers.getContractFactory("SimpleStorage");
    const contract = contractFactory.attach(taskArgs.contract);
    const args = taskArgs.args ? taskArgs.args.split(',') : [];
    const result = await contract[taskArgs.method](...args);
    console.log(`调用结果: ${result}`);
  });

module.exports = {};