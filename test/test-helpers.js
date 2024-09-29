const { ethers } = require("hardhat");

async function deployContract(contractName, constructorArgs = []) {
  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.deploy(...constructorArgs);
  return contract;
}

module.exports = {
  deployContract,
};