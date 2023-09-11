import { ChainId } from "./constants"

export type DeployedContracts = { [name in keyof typeof XBasedContracts]?: string }
export type DeployedMultichainContracts =
  { [chainId in ChainId]: DeployedContracts } |
  { [chainId: number]: DeployedContracts }

export enum XBasedContracts {
  "Factory",
  "Router",
  "WETH9",

  "Multicall3",

  "USDbC",
  "DAI",
  "XBD",

  "StakingFactory",
  "AirdropFactory",
}

export const deployed: DeployedMultichainContracts = {
  "8453": {
    "WETH9": "0x4200000000000000000000000000000000000006",
    "Factory": "0xEF3f8f05167F66C044686B63524444aF27E63C4a",
    "Router": "0x8E587110613fEdBd9456e88aD37018A3d091ff2f",
    "USDbC": "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
    "DAI": "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    "Multicall3": "0xcA11bde05977b3631167028862bE2a173976CA11",
    "XBD": "0x2433F84FeDAd1D9421FAdDA986c6065299fB9Dd0",
    "StakingFactory": "0xae96194DaA6402448aB37BEF0Bfcc322bAbd8aD4"
  },
  "31337": {
    "WETH9": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    "Factory": "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    "Router": "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    "USDbC": "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    "DAI": "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
    "Multicall3": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    "XBD": "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    "StakingFactory": "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
    "AirdropFactory": "0x610178dA211FEF7D417bC0e6FeD39F05609AD788"
  },
  "11155111": {
    "WETH9": "0xC53341A203ADFD60174A534CAc03141237Cdf92a",
    "Factory": "0xb5118ef26985c46d93bB2786191cBf064B993E95",
    "Router": "0xAD399fb1979af77CB980b93e461ba9bA13Cb3870",
    "USDbC": "0x1e662884140b4FD80Edc163BBfc2F8d051D3963c",
    "DAI": "0x1bD57Be01e59359A778bEE76EF9Da09e96ff12aC",
    "Multicall3": "0xcA11bde05977b3631167028862bE2a173976CA11",
    "XBD": "0xc3fdc032617BBfE92Ae2511b713d88690063f4F1",
    "StakingFactory": "0xDA2e53A5eB8B04AA371941dac3c78796Fe0F3b07"
  }
}
