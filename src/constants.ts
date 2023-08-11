import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  SEPOLIA = 0xaa36a7,
  BASE = 0x2105 //8453
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
  [ChainId.SEPOLIA]: "0xb92Bb7731d92705a1d2D63f80a55c81B6437a1c5", // Router: 0x102b6b459D95d3f808D9630Fb96f0Db8B7c6bA4F
  [ChainId.BASE]: "0xC3550497E591Ac6ed7a7E03ffC711CfB7412E57F",
}

export const INIT_CODE_HASH = '0x0ac14d834b4c80f5eeb7e01253f963e55ab38ac98196e2e57ebac13e2afc9fd6'

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
