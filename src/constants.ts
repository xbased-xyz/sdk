import JSBI from 'jsbi'
import { deployed } from './deployed'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  SEPOLIA = 11155111,
  BASE = 8453,
  BASE_GOERLI = 84531,
  HARDHAT = 31337
}

export const SUPPORTED_CHAINS = [
  ChainId.SEPOLIA,
  ChainId.BASE,
  ChainId.BASE_GOERLI,
  ChainId.HARDHAT
] as const
export type SupportedChainsType = typeof SUPPORTED_CHAINS[number]

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

export type ChainMap<T> = {
  [key in ChainId]?: T;
};

export const FACTORY_ADDRESS = Object.keys(deployed).reduce((prev, curr) => {
  (prev as any)[curr] = (deployed as any)[curr].Factory;
  return prev;
}, {} as ChainMap<string>)

export const INIT_CODE_HASH = '0x98e357a72fa474308ab79840ad29aa35db695d09c01df1b74a7d401994761bcf'

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
