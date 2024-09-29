const { task } = require("hardhat/config");

task("event-listener", "监听合约事件\n示例: npx hardhat event-listener --contract 0x123456789abcdef")
  .addParam("contract", "合约地址")
  .setAction(async (taskArgs, hre) => {
    const contractFactory = await hre.ethers.getContractFactory("SimpleStorage");
    const contract = contractFactory.attach(taskArgs.contract);
    
    console.log("开始监听ValueChanged事件...");
    contract.on("ValueChanged", (newValue, event) => {
      console.log(`新值: ${newValue}`);
      console.log("事件:", event);
    });
  });

module.exports = {};