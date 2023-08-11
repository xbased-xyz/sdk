import { Currency } from './currency';
import { ChainId } from '../constants';
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export declare class Token extends Currency {
    readonly chainId: ChainId;
    readonly address: string;
    static fetchData(chainId: ChainId, address: string, provider?: import("@ethersproject/providers").BaseProvider, symbol?: string, name?: string): Promise<Token>;
    constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string);
    equals(other: Token): boolean;
    sortsBefore(other: Token): boolean;
}
/**
 * Compares two currencies for equality
 */
export declare function currencyEquals(currencyA: Currency, currencyB: Currency): boolean;
export declare const WETH: {
    1: Token;
    11155111: Token;
    8453: Token;
};
