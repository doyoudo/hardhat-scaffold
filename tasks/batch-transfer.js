const { task } = require("hardhat/config");

task("batch-transfer", "批量转账ETH\n示例: npx hardhat batch-transfer --addresses 0x123,0x456,0x789 --amounts 0.1,0.2,0.3")
  .addParam("addresses", "接收地址列表，用逗号分隔")
  .addParam("amounts", "转账金额列表（ETH），用逗号分隔")
  .setAction(async (taskArgs, hre) => {
    const addresses = taskArgs.addresses.split(',');
    const amounts = taskArgs.amounts.split(',').map(a => hre.ethers.parseEther(a));
    
    const [sender] = await hre.ethers.getSigners();

    for (let i = 0; i < addresses.length; i++) {
      await sender.sendTransaction({
        to: addresses[i],
        value: amounts[i]
      });
      console.log(`已转账 ${hre.ethers.formatEther(amounts[i])} ETH 到 ${addresses[i]}`);
    }
  });

module.exports = {};