import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  SEPOLIA = 11155111,
  BASE = 8453,
  // LOCAL  = 31337
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

// TODO: FACTORY_ADDRESS
export const FACTORY_ADDRESS = {
  [ChainId.SEPOLIA]: "0xDaD39353Cb8A16CDbC70c01234Bf2CFbcD644F3a",
  [ChainId.BASE]: "0xC3550497E591Ac6ed7a7E03ffC711CfB7412E57F", // TODO: to be deployed
}

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
