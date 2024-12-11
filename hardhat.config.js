require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    solidity: {
      version: "0.8.26",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
          details: {
            yul: false,
          },
        },
      }
    },
    networks: {
        'neox-t4': {
            url: 'https://neoxt4seed1.ngd.network',
            accounts: [`${process.env.PRIVATE_KEY}`],
            gasPrice: 40e9,
            gas: 50e6,
        },
    },
    etherscan: {
        apiKey: {
            'neox-t4': 'empty'
        },
        customChains: [
            {
                network: 'neox-t4',
                chainId: 12227332,
                urls: {
                    apiURL: 'https://xt4scan.ngd.network/api',
                    browserURL: 'https://neoxt4scan.ngd.network'
                }
            }
        ]
    }
};
