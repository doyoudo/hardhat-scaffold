const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let simpleStorage;

  beforeEach(async function () {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy();
    // 移除 .deployed() 调用
  });

  it("Should store and retrieve the value", async function () {
    await simpleStorage.set(42);
    expect(await simpleStorage.get()).to.equal(42);
  });
});