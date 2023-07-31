require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      url: `ttps://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_SEPOLIA_API_KEY}`,
      accounts: [process.env.ACCOUNT_SECRET],
      chainId: 1337,
    },
  },
  paths: {
    artifacts: "./Artifacts",
    cache: "./Cache",
    sources: "./Contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
