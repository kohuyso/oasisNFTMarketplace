require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  etherscan: {
    apiKey: "6XDT8CR5EM5CRT8532WXQY97BNDIR13868",
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/dc03853a60d04540b6144467b09ba1e6`,
      accounts: [
        "824a832cc59532cc0ff9ecda586c2c2de3ed6d90de2685bc7a53e2333025bfbd",
      ],
    },
  },
};
