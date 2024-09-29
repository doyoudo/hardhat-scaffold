const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployContract } = require("../test-helpers");

describe("TokenStorage 集成测试", function () {
  let simpleToken;
  let simpleStorage;
  let owner;
  let addr1;

  before(async function () {
    [owner, addr1] = await ethers.getSigners();
    simpleToken = await deployContract("SimpleToken", ["SimpleToken", "STK", 1000000]);
    simpleStorage = await deployContract("SimpleStorage");
  });

  it("应该能够在 SimpleStorage 中存储代币余额", async function () {
    // 转移一些代币到 addr1
    await simpleToken.transfer(addr1.address, 100000);
    
    // 获取 addr1 的代币余额
    const balance = await simpleToken.balanceOf(addr1.address);
    
    // 将余额存储在 SimpleStorage 中
    await simpleStorage.connect(addr1).set(balance);
    
    // 验证存储的值
    expect(await simpleStorage.get()).to.equal(100000);
  });

  it("应该能够更新 SimpleStorage 中的值并反映在代币转账中", async function () {
    // 初始余额
    const initialBalance = await simpleToken.balanceOf(addr1.address);
    
    // 在 SimpleStorage 中设置新值
    await simpleStorage.connect(addr1).set(50000);
    
    // 使用 SimpleStorage 中的值进行转账
    const newBalance = await simpleStorage.get();
    await simpleToken.connect(addr1).transfer(owner.address, newBalance);
    
    // 验证新的余额
    expect(await simpleToken.balanceOf(addr1.address)).to.equal(initialBalance.sub(newBalance));
  });
});