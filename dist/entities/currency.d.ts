import { ChainId } from '../constants';
/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */
export declare class Currency {
    readonly decimals: number;
    readonly symbol?: string;
    readonly name?: string;
    /**
     * The only instance of the base class `Currency`.
     */
    static readonly ETHER: {
        80001: Currency;
        137: Currency;
        568: Currency;
        2000: Currency;
        1442: Currency;
        1101: Currency;
    };
    /**
     * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
     * @param decimals decimals of the currency
     * @param symbol symbol of the currency
     * @param name of the currency
     */
    protected constructor(decimals: number, symbol?: string, name?: string);
}
declare const ETHER: {
    80001: Currency;
    137: Currency;
    568: Currency;
    2000: Currency;
    1442: Currency;
    1101: Currency;
};
export { ETHER };
