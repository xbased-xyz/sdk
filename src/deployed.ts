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
    "Factory": "0xDaD39353Cb8A16CDbC70c01234Bf2CFbcD644F3a",
    "Router": "0xAe17664b9E8cB573976FE37951ff13Ac8102539E",
    "Multicall3": "0xcA11bde05977b3631167028862bE2a173976CA11",
    "XBD": "0xeF0591C2dc6E28e2D88f77b92FeEcFD679402a91",
    "StakingFactory": "0xD405C728a281954d38E0b3Ac07eF3263B9f1634f"
  }
}
