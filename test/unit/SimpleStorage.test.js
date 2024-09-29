const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployContract } = require("../test-helpers");

describe("SimpleStorage", function () {
  let simpleStorage;

  beforeEach(async function () {
    simpleStorage = await deployContract("SimpleStorage");
  });

  it("应该存储并检索值", async function () {
    await simpleStorage.set(42);
    expect(await simpleStorage.get()).to.equal(42);
  });

  // ... 可以添加更多 SimpleStorage 相关的测试 ...
});