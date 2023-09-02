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

  "USDbc",
  "DAI",
  "XBD",

  "StakingFactory"
}

export const deployed: DeployedMultichainContracts = {
  "8453": {
    "WETH9": "0x4200000000000000000000000000000000000006",
    "Multicall3": "0xcA11bde05977b3631167028862bE2a173976CA11",
    "XBD": ""
  },
  "31337": {
    "WETH9": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    "Factory": "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    "Router": "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    "USDbc": "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    "DAI": "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
    "Multicall3": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    "XBD": "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    "StakingFactory": "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853"
  },
  "11155111": {
    "WETH9": "0xC53341A203ADFD60174A534CAc03141237Cdf92a",
    "Factory": "0xb5118ef26985c46d93bB2786191cBf064B993E95",
    "Router": "0xAD399fb1979af77CB980b93e461ba9bA13Cb3870",
    "USDbc": "0x1e662884140b4FD80Edc163BBfc2F8d051D3963c",
    "DAI": "0x1bD57Be01e59359A778bEE76EF9Da09e96ff12aC",
    "Multicall3": "0xcA11bde05977b3631167028862bE2a173976CA11",
    "XBD": "0xE13bb2659A7882D3956B5431A4417632160e434E",
    "StakingFactory": "0x677233AfD16006EF0c260cFd2823657B320A8fC2"
  }
}
