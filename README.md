# 简单存储合约

这是一个使用Hardhat开发的简单存储智能合约demo。

## 安装

1. 克隆仓库
2. 运行 `npm install` 安装依赖

## 配置

1. 创建一个 `.env` 文件
2. 添加以下环境变量:
   ```
   SEPOLIA_URL=你的Sepolia RPC URL
   PRIVATE_KEY=你的钱包私钥
   ETHERSCAN_API_KEY=你的Etherscan API密钥
   ```

## 测试

运行 `npx hardhat test` 执行测试

## 部署和验证

运行 `npx hardhat run scripts/deploy.js --network sepolia` 部署到Sepolia测试网并自动验证合约

## 使用

部署后,你可以通过合约地址与合约交互:
- 使用 `set(uint256)` 函数存储一个数字
- 使用 `get()` 函数检索存储的数字

## 手动验证（如果自动验证失败）

如果自动验证失败，你可以使用以下命令手动验证合约：

```
npx hardhat verify --network sepolia <DEPLOYED_CONTRACT_ADDRESS>
```

请将 <DEPLOYED_CONTRACT_ADDRESS> 替换为实际部署的合约地址。