const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployContract } = require("../test-helpers");

describe("SimpleToken 单元测试", function () {
  let simpleToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    simpleToken = await deployContract("SimpleToken", ["SimpleToken", "STK", 1000000]);
  });

  it("应该正确部署合约并设置初始供应量", async function () {
    expect(await simpleToken.name()).to.equal("SimpleToken");
    expect(await simpleToken.symbol()).to.equal("STK");
    expect(await simpleToken.totalSupply()).to.equal(1000000);
    expect(await simpleToken.balanceOf(owner.address)).to.equal(1000000);
  });

  it("应该允许转账代币", async function () {
    await simpleToken.transfer(addr1.address, 50000);
    expect(await simpleToken.balanceOf(addr1.address)).to.equal(50000);
    expect(await simpleToken.balanceOf(owner.address)).to.equal(950000);
  });

  it("不应允许转账超过余额的代币", async function () {
    await expect(simpleToken.connect(addr1).transfer(addr2.address, 1))
      .to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });
});