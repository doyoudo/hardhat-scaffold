const hre = require("hardhat");
const deployConfig = require('../deploy-config');

async function main() {
  try {
    const [deployer] = await ethers.getSigners();

    console.log("正在使用账户部署合约:", deployer.address);

    // 从配置或环境变量中获取合约名称和构造函数参数
    const contractName = process.env.CONTRACT_NAME || deployConfig.contractName || "SimpleToken";
    const constructorArgs = JSON.parse(process.env.CONSTRUCTOR_ARGS || JSON.stringify(deployConfig.constructorArgs || []));

    console.log(`准备部署合约: ${contractName}`);
    console.log("构造函数参数:", constructorArgs);

    // 获取合约工厂
    const ContractFactory = await ethers.getContractFactory(contractName);
    
    // 部署合约
    console.log("开始部署合约...");
    const contract = await ContractFactory.deploy(...constructorArgs);

    console.log("等待合约部署确认...");
    await contract.waitForDeployment();

    const contractAddress = await contract.getAddress();
    console.log(`${contractName} 已成功部署到:`, contractAddress);

    // 保存部署信息到文件
    const fs = require('fs');
    const deploymentInfo = {
      contractName: contractName,
      contractAddress: contractAddress,
      deploymentTime: new Date().toISOString(),
      constructorArgs: constructorArgs
    };
    fs.writeFileSync('deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
    console.log("部署信息已保存到 deployment-info.json");

    // 如果在主网或测试网上，可以添加合约验证步骤
    if (["mainnet", "goerli", "sepolia"].includes(hre.network.name)) {
      console.log("等待几个区块确认后进行合约验证...");
      // await contract.deployTransaction.wait(5);
      contract.deploymentTransaction().wait(5)
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: constructorArgs,
      });
      console.log("合约验证完成");
    }

  } catch (error) {
    console.error("部署过程中发生错误:");
    console.error(error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("未捕获的错误:");
    console.error(error);
    process.exit(1);
  });