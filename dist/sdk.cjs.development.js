'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var JSBI = _interopDefault(require('jsbi'));
var invariant = _interopDefault(require('tiny-invariant'));
var warning = _interopDefault(require('tiny-warning'));
var address = require('@ethersproject/address');
var networks = require('@ethersproject/networks');
var providers = require('@ethersproject/providers');
var contracts = require('@ethersproject/contracts');
var _Big = _interopDefault(require('big.js'));
var toFormat = _interopDefault(require('toformat'));
var _Decimal = _interopDefault(require('decimal.js-light'));
var solidity = require('@ethersproject/solidity');
var IUniswapV2Pair = _interopDefault(require('@uniswap/v2-core/build/IUniswapV2Pair.json'));

var _FACTORY_ADDRESS, _SOLIDITY_TYPE_MAXIMA;
(function (ChainId) {
  ChainId[ChainId["MAINNET"] = 1] = "MAINNET";
  ChainId[ChainId["SEPOLIA"] = 11155111] = "SEPOLIA";
  ChainId[ChainId["BASE"] = 8453] = "BASE";
})(exports.ChainId || (exports.ChainId = {}));
(function (TradeType) {
  TradeType[TradeType["EXACT_INPUT"] = 0] = "EXACT_INPUT";
  TradeType[TradeType["EXACT_OUTPUT"] = 1] = "EXACT_OUTPUT";
})(exports.TradeType || (exports.TradeType = {}));
(function (Rounding) {
  Rounding[Rounding["ROUND_DOWN"] = 0] = "ROUND_DOWN";
  Rounding[Rounding["ROUND_HALF_UP"] = 1] = "ROUND_HALF_UP";
  Rounding[Rounding["ROUND_UP"] = 2] = "ROUND_UP";
})(exports.Rounding || (exports.Rounding = {}));
// TODO: FACTORY_ADDRESS
var FACTORY_ADDRESS = (_FACTORY_ADDRESS = {}, _FACTORY_ADDRESS[exports.ChainId.SEPOLIA] = "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32", _FACTORY_ADDRESS[exports.ChainId.BASE] = "0xC3550497E591Ac6ed7a7E03ffC711CfB7412E57F", _FACTORY_ADDRESS);
var INIT_CODE_HASH = '0ac14d834b4c80f5eeb7e01253f963e55ab38ac98196e2e57ebac13e2afc9fd6';
var MINIMUM_LIQUIDITY = /*#__PURE__*/JSBI.BigInt(1000);
// exports for internal consumption
var ZERO = /*#__PURE__*/JSBI.BigInt(0);
var ONE = /*#__PURE__*/JSBI.BigInt(1);
var TWO = /*#__PURE__*/JSBI.BigInt(2);
var THREE = /*#__PURE__*/JSBI.BigInt(3);
var FIVE = /*#__PURE__*/JSBI.BigInt(5);
var TEN = /*#__PURE__*/JSBI.BigInt(10);
var _100 = /*#__PURE__*/JSBI.BigInt(100);
var _997 = /*#__PURE__*/JSBI.BigInt(997);
var _1000 = /*#__PURE__*/JSBI.BigInt(1000);
var SolidityType;
(function (SolidityType) {
  SolidityType["uint8"] = "uint8";
  SolidityType["uint256"] = "uint256";
})(SolidityType || (SolidityType = {}));
var SOLIDITY_TYPE_MAXIMA = (_SOLIDITY_TYPE_MAXIMA = {}, _SOLIDITY_TYPE_MAXIMA[SolidityType.uint8] = /*#__PURE__*/JSBI.BigInt('0xff'), _SOLIDITY_TYPE_MAXIMA[SolidityType.uint256] = /*#__PURE__*/JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'), _SOLIDITY_TYPE_MAXIMA);

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

// see https://stackoverflow.com/a/41102306
var CAN_SET_PROTOTYPE = ('setPrototypeOf' in Object);
var InsufficientReservesError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(InsufficientReservesError, _Error);
  function InsufficientReservesError() {
    var _this;
    _this = _Error.call(this) || this;
    _this.isInsufficientReservesError = true;
    _this.name = _this.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this), (this instanceof InsufficientReservesError ? this.constructor : void 0).prototype);
    return _this;
  }
  return InsufficientReservesError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var InsufficientInputAmountError = /*#__PURE__*/function (_Error2) {
  _inheritsLoose(InsufficientInputAmountError, _Error2);
  function InsufficientInputAmountError() {
    var _this2;
    _this2 = _Error2.call(this) || this;
    _this2.isInsufficientInputAmountError = true;
    _this2.name = _this2.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this2), (this instanceof InsufficientInputAmountError ? this.constructor : void 0).prototype);
    return _this2;
  }
  return InsufficientInputAmountError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

function validateSolidityTypeInstance(value, solidityType) {
  !JSBI.greaterThanOrEqual(value, ZERO) ?  invariant(false, value + " is not a " + solidityType + ".")  : void 0;
  !JSBI.lessThanOrEqual(value, SOLIDITY_TYPE_MAXIMA[solidityType]) ?  invariant(false, value + " is not a " + solidityType + ".")  : void 0;
}
// warns if addresses are not checksummed
function validateAndParseAddress(address$1) {
  try {
    var checksummedAddress = address.getAddress(address$1);
    "development" !== "production" ? warning(address$1 === checksummedAddress, address$1 + " is not checksummed.") : void 0;
    return checksummedAddress;
  } catch (error) {
      invariant(false, address$1 + " is not a valid address.")  ;
  }
}
function parseBigintIsh(bigintIsh) {
  return bigintIsh instanceof JSBI ? bigintIsh : typeof bigintIsh === 'bigint' ? JSBI.BigInt(bigintIsh.toString()) : JSBI.BigInt(bigintIsh);
}
// mock the on-chain sqrt function
function sqrt(y) {
  validateSolidityTypeInstance(y, SolidityType.uint256);
  var z = ZERO;
  var x;
  if (JSBI.greaterThan(y, THREE)) {
    z = y;
    x = JSBI.add(JSBI.divide(y, TWO), ONE);
    while (JSBI.lessThan(x, z)) {
      z = x;
      x = JSBI.divide(JSBI.add(JSBI.divide(y, x), x), TWO);
    }
  } else if (JSBI.notEqual(y, ZERO)) {
    z = ONE;
  }
  return z;
}
// given an array of items sorted by `comparator`, insert an item into its sort index and constrain the size to
// `maxSize` by removing the last item
function sortedInsert(items, add, maxSize, comparator) {
  !(maxSize > 0) ?  invariant(false, 'MAX_SIZE_ZERO')  : void 0;
  // this is an invariant because the interface cannot return multiple removed items if items.length exceeds maxSize
  !(items.length <= maxSize) ?  invariant(false, 'ITEMS_SIZE')  : void 0;
  // short circuit first item add
  if (items.length === 0) {
    items.push(add);
    return null;
  } else {
    var isFull = items.length === maxSize;
    // short circuit if full and the additional item does not come before the last item
    if (isFull && comparator(items[items.length - 1], add) <= 0) {
      return add;
    }
    var lo = 0,
      hi = items.length;
    while (lo < hi) {
      var mid = lo + hi >>> 1;
      if (comparator(items[mid], add) <= 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    items.splice(lo, 0, add);
    return isFull ? items.pop() : null;
  }
}

/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */
var Currency = function Currency(decimals, symbol, name) {
  validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8);
  this.decimals = decimals;
  this.symbol = symbol;
  this.name = name;
};
Currency.ETHER = /*#__PURE__*/new Currency(18, 'ETH', 'Ether');
var ETHER = Currency.ETHER;

var ERC20 = [
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var _CACHE, _WETH;
var CACHE = (_CACHE = {}, _CACHE[exports.ChainId.MAINNET] = {
  '0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A': 9 // DGD
}, _CACHE);
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
var Token = /*#__PURE__*/function (_Currency) {
  _inheritsLoose(Token, _Currency);
  function Token(chainId, address, decimals, symbol, name) {
    var _this;
    _this = _Currency.call(this, decimals, symbol, name) || this;
    _this.chainId = chainId;
    _this.address = validateAndParseAddress(address);
    return _this;
  }
  Token.fetchData = function fetchData(chainId, address, provider, symbol, name) {
    try {
      var _CACHE2, _CACHE2$chainId;
      var _temp2 = function _temp2(parsedDecimals) {
        return new Token(chainId, address, parsedDecimals, symbol, name);
      };
      if (provider === undefined) provider = providers.getDefaultProvider(networks.getNetwork(chainId));
      var _temp = typeof ((_CACHE2 = CACHE) === null || _CACHE2 === void 0 ? void 0 : (_CACHE2$chainId = _CACHE2[chainId]) === null || _CACHE2$chainId === void 0 ? void 0 : _CACHE2$chainId[address]) === 'number';
      return Promise.resolve(_temp ? _temp2(CACHE[chainId][address]) : Promise.resolve(new contracts.Contract(address, ERC20, provider).decimals().then(function (decimals) {
        var _CACHE3, _extends2, _extends3;
        CACHE = _extends({}, CACHE, (_extends3 = {}, _extends3[chainId] = _extends({}, (_CACHE3 = CACHE) === null || _CACHE3 === void 0 ? void 0 : _CACHE3[chainId], (_extends2 = {}, _extends2[address] = decimals, _extends2)), _extends3));
        return decimals;
      })).then(_temp2));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var _proto = Token.prototype;
  _proto.equals = function equals(other) {
    // short circuit on reference equality
    if (this === other) {
      return true;
    }
    var equivalent = this.chainId === other.chainId && this.address === other.address;
    if (equivalent) {
      // reference the same token, must have the same decimals/symbol/name
      !(this.decimals === other.decimals) ?  invariant(false, 'DECIMALS')  : void 0;
      if (this.symbol && other.symbol) !(this.symbol === other.symbol) ?  invariant(false, 'SYMBOL')  : void 0;
      if (this.name && other.name) !(this.name === other.name) ?  invariant(false, 'NAME')  : void 0;
    }
    return equivalent;
  };
  _proto.sortsBefore = function sortsBefore(other) {
    !(this.chainId === other.chainId) ?  invariant(false, 'CHAIN_IDS')  : void 0;
    !(this.address !== other.address) ?  invariant(false, 'ADDRESSES')  : void 0;
    return this.address.toLowerCase() < other.address.toLowerCase();
  };
  return Token;
}(Currency);
/**
 * Compares two currencies for equality
 */
function currencyEquals(currencyA, currencyB) {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB);
  } else if (currencyA instanceof Token) {
    return false;
  } else if (currencyB instanceof Token) {
    return false;
  } else {
    return currencyA === currencyB;
  }
}
var WETH = (_WETH = {}, _WETH[exports.ChainId.MAINNET] = /*#__PURE__*/new Token(exports.ChainId.MAINNET, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether'), _WETH[exports.ChainId.SEPOLIA] = /*#__PURE__*/new Token(exports.ChainId.SEPOLIA, '0x30B2F2E0359B61D812F4a1860EEEaCc5b513FB64', 18, 'WETH', 'Wrapped Ether'), _WETH[exports.ChainId.BASE] = /*#__PURE__*/new Token(exports.ChainId.BASE, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'), _WETH);

var _toSignificantRoundin, _toFixedRounding;
var Decimal = /*#__PURE__*/toFormat(_Decimal);
var Big = /*#__PURE__*/toFormat(_Big);
var toSignificantRounding = (_toSignificantRoundin = {}, _toSignificantRoundin[exports.Rounding.ROUND_DOWN] = Decimal.ROUND_DOWN, _toSignificantRoundin[exports.Rounding.ROUND_HALF_UP] = Decimal.ROUND_HALF_UP, _toSignificantRoundin[exports.Rounding.ROUND_UP] = Decimal.ROUND_UP, _toSignificantRoundin);
var toFixedRounding = (_toFixedRounding = {}, _toFixedRounding[exports.Rounding.ROUND_DOWN] = 0, _toFixedRounding[exports.Rounding.ROUND_HALF_UP] = 1, _toFixedRounding[exports.Rounding.ROUND_UP] = 3, _toFixedRounding);
var Fraction = /*#__PURE__*/function () {
  function Fraction(numerator, denominator) {
    if (denominator === void 0) {
      denominator = ONE;
    }
    this.numerator = parseBigintIsh(numerator);
    this.denominator = parseBigintIsh(denominator);
  }
  // performs floor division
  var _proto = Fraction.prototype;
  _proto.invert = function invert() {
    return new Fraction(this.denominator, this.numerator);
  };
  _proto.add = function add(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.add(this.numerator, otherParsed.numerator), this.denominator);
    }
    return new Fraction(JSBI.add(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };
  _proto.subtract = function subtract(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.subtract(this.numerator, otherParsed.numerator), this.denominator);
    }
    return new Fraction(JSBI.subtract(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };
  _proto.lessThan = function lessThan(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.lessThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };
  _proto.equalTo = function equalTo(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.equal(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };
  _proto.greaterThan = function greaterThan(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.greaterThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };
  _proto.multiply = function multiply(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.numerator), JSBI.multiply(this.denominator, otherParsed.denominator));
  };
  _proto.divide = function divide(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(this.denominator, otherParsed.numerator));
  };
  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }
    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }
    !Number.isInteger(significantDigits) ?  invariant(false, significantDigits + " is not an integer.")  : void 0;
    !(significantDigits > 0) ?  invariant(false, significantDigits + " is not positive.")  : void 0;
    Decimal.set({
      precision: significantDigits + 1,
      rounding: toSignificantRounding[rounding]
    });
    var quotient = new Decimal(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  };
  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }
    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }
    !Number.isInteger(decimalPlaces) ?  invariant(false, decimalPlaces + " is not an integer.")  : void 0;
    !(decimalPlaces >= 0) ?  invariant(false, decimalPlaces + " is negative.")  : void 0;
    Big.DP = decimalPlaces;
    Big.RM = toFixedRounding[rounding];
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(decimalPlaces, format);
  };
  _createClass(Fraction, [{
    key: "quotient",
    get: function get() {
      return JSBI.divide(this.numerator, this.denominator);
    }
    // remainder after floor division
  }, {
    key: "remainder",
    get: function get() {
      return new Fraction(JSBI.remainder(this.numerator, this.denominator), this.denominator);
    }
  }]);
  return Fraction;
}();

var Big$1 = /*#__PURE__*/toFormat(_Big);
var CurrencyAmount = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(CurrencyAmount, _Fraction);
  // amount _must_ be raw, i.e. in the native representation
  function CurrencyAmount(currency, amount) {
    var _this;
    var parsedAmount = parseBigintIsh(amount);
    validateSolidityTypeInstance(parsedAmount, SolidityType.uint256);
    _this = _Fraction.call(this, parsedAmount, JSBI.exponentiate(TEN, JSBI.BigInt(currency.decimals))) || this;
    _this.currency = currency;
    return _this;
  }
  /**
   * Helper that calls the constructor with the ETHER currency
   * @param amount ether amount in wei
   */
  CurrencyAmount.ether = function ether(amount) {
    return new CurrencyAmount(ETHER, amount);
  };
  var _proto = CurrencyAmount.prototype;
  _proto.add = function add(other) {
    !currencyEquals(this.currency, other.currency) ?  invariant(false, 'TOKEN')  : void 0;
    return new CurrencyAmount(this.currency, JSBI.add(this.raw, other.raw));
  };
  _proto.subtract = function subtract(other) {
    !currencyEquals(this.currency, other.currency) ?  invariant(false, 'TOKEN')  : void 0;
    return new CurrencyAmount(this.currency, JSBI.subtract(this.raw, other.raw));
  };
  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }
    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }
    return _Fraction.prototype.toSignificant.call(this, significantDigits, format, rounding);
  };
  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = this.currency.decimals;
    }
    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }
    !(decimalPlaces <= this.currency.decimals) ?  invariant(false, 'DECIMALS')  : void 0;
    return _Fraction.prototype.toFixed.call(this, decimalPlaces, format, rounding);
  };
  _proto.toExact = function toExact(format) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }
    Big$1.DP = this.currency.decimals;
    return new Big$1(this.numerator.toString()).div(this.denominator.toString()).toFormat(format);
  };
  _createClass(CurrencyAmount, [{
    key: "raw",
    get: function get() {
      return this.numerator;
    }
  }]);
  return CurrencyAmount;
}(Fraction);

var TokenAmount = /*#__PURE__*/function (_CurrencyAmount) {
  _inheritsLoose(TokenAmount, _CurrencyAmount);
  // amount _must_ be raw, i.e. in the native representation
  function TokenAmount(token, amount) {
    var _this;
    _this = _CurrencyAmount.call(this, token, amount) || this;
    _this.token = token;
    return _this;
  }
  var _proto = TokenAmount.prototype;
  _proto.add = function add(other) {
    !this.token.equals(other.token) ?  invariant(false, 'TOKEN')  : void 0;
    return new TokenAmount(this.token, JSBI.add(this.raw, other.raw));
  };
  _proto.subtract = function subtract(other) {
    !this.token.equals(other.token) ?  invariant(false, 'TOKEN')  : void 0;
    return new TokenAmount(this.token, JSBI.subtract(this.raw, other.raw));
  };
  return TokenAmount;
}(CurrencyAmount);

var CACHE$1 = {};
var Pair = /*#__PURE__*/function () {
  function Pair(tokenAmountA, tokenAmountB) {
    var tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
    ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    this.liquidityToken = new Token(tokenAmounts[0].token.chainId, Pair.getAddress(tokenAmounts[0].token, tokenAmounts[1].token), 18, 'UNI-V2', 'Uniswap V2');
    this.tokenAmounts = tokenAmounts;
  }
  Pair.getAddress = function getAddress(tokenA, tokenB) {
    var _CACHE, _CACHE$tokens$0$addre;
    var tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]; // does safety checks
    if (((_CACHE = CACHE$1) === null || _CACHE === void 0 ? void 0 : (_CACHE$tokens$0$addre = _CACHE[tokens[0].address]) === null || _CACHE$tokens$0$addre === void 0 ? void 0 : _CACHE$tokens$0$addre[tokens[1].address]) === undefined) {
      var _CACHE2, _extends2, _extends3;
      CACHE$1 = _extends({}, CACHE$1, (_extends3 = {}, _extends3[tokens[0].address] = _extends({}, (_CACHE2 = CACHE$1) === null || _CACHE2 === void 0 ? void 0 : _CACHE2[tokens[0].address], (_extends2 = {}, _extends2[tokens[1].address] = address.getCreate2Address(FACTORY_ADDRESS, solidity.keccak256(['bytes'], [solidity.pack(['address', 'address'], [tokens[0].address, tokens[1].address])]), INIT_CODE_HASH), _extends2)), _extends3));
    }
    return CACHE$1[tokens[0].address][tokens[1].address];
  };
  Pair.fetchData = function fetchData(tokenA, tokenB, provider) {
    try {
      if (provider === undefined) provider = providers.getDefaultProvider(networks.getNetwork(tokenA.chainId));
      !(tokenA.chainId === tokenB.chainId) ? "development" !== "production" ? invariant(false, 'CHAIN_ID') : invariant(false) : void 0;
      var address = Pair.getAddress(tokenA, tokenB);
      return Promise.resolve(new contracts.Contract(address, IUniswapV2Pair.abi, provider).getReserves()).then(function (_ref) {
        var reserves0 = _ref[0],
          reserves1 = _ref[1];
        var balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0];
        return new Pair(new TokenAmount(tokenA, balances[0]), new TokenAmount(tokenB, balances[1]));
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Returns true if the token is either token0 or token1
   * @param token to check
   */
  ;
  var _proto = Pair.prototype;
  _proto.involvesToken = function involvesToken(token) {
    return token.equals(this.token0) || token.equals(this.token1);
  };
  _proto.reserveOf = function reserveOf(token) {
    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    return token.equals(this.token0) ? this.reserve0 : this.reserve1;
  };
  _proto.getOutputAmount = function getOutputAmount(inputAmount) {
    !this.involvesToken(inputAmount.token) ?  invariant(false, 'TOKEN')  : void 0;
    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO)) {
      throw new InsufficientReservesError();
    }
    var inputReserve = this.reserveOf(inputAmount.token);
    var outputReserve = this.reserveOf(inputAmount.token.equals(this.token0) ? this.token1 : this.token0);
    var inputAmountWithFee = JSBI.multiply(inputAmount.raw, _997);
    var numerator = JSBI.multiply(inputAmountWithFee, outputReserve.raw);
    var denominator = JSBI.add(JSBI.multiply(inputReserve.raw, _1000), inputAmountWithFee);
    var outputAmount = new TokenAmount(inputAmount.token.equals(this.token0) ? this.token1 : this.token0, JSBI.divide(numerator, denominator));
    if (JSBI.equal(outputAmount.raw, ZERO)) {
      throw new InsufficientInputAmountError();
    }
    return [outputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))];
  };
  _proto.getInputAmount = function getInputAmount(outputAmount) {
    !this.involvesToken(outputAmount.token) ?  invariant(false, 'TOKEN')  : void 0;
    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO) || JSBI.greaterThanOrEqual(outputAmount.raw, this.reserveOf(outputAmount.token).raw)) {
      throw new InsufficientReservesError();
    }
    var outputReserve = this.reserveOf(outputAmount.token);
    var inputReserve = this.reserveOf(outputAmount.token.equals(this.token0) ? this.token1 : this.token0);
    var numerator = JSBI.multiply(JSBI.multiply(inputReserve.raw, outputAmount.raw), _1000);
    var denominator = JSBI.multiply(JSBI.subtract(outputReserve.raw, outputAmount.raw), _997);
    var inputAmount = new TokenAmount(outputAmount.token.equals(this.token0) ? this.token1 : this.token0, JSBI.add(JSBI.divide(numerator, denominator), ONE));
    return [inputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))];
  };
  _proto.getLiquidityMinted = function getLiquidityMinted(totalSupply, tokenAmountA, tokenAmountB) {
    !totalSupply.token.equals(this.liquidityToken) ?  invariant(false, 'LIQUIDITY')  : void 0;
    var tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
    ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    !(tokenAmounts[0].token.equals(this.token0) && tokenAmounts[1].token.equals(this.token1)) ?  invariant(false, 'TOKEN')  : void 0;
    var liquidity;
    if (JSBI.equal(totalSupply.raw, ZERO)) {
      liquidity = JSBI.subtract(sqrt(JSBI.multiply(tokenAmounts[0].raw, tokenAmounts[1].raw)), MINIMUM_LIQUIDITY);
    } else {
      var amount0 = JSBI.divide(JSBI.multiply(tokenAmounts[0].raw, totalSupply.raw), this.reserve0.raw);
      var amount1 = JSBI.divide(JSBI.multiply(tokenAmounts[1].raw, totalSupply.raw), this.reserve1.raw);
      liquidity = JSBI.lessThanOrEqual(amount0, amount1) ? amount0 : amount1;
    }
    if (!JSBI.greaterThan(liquidity, ZERO)) {
      throw new InsufficientInputAmountError();
    }
    return new TokenAmount(this.liquidityToken, liquidity);
  };
  _proto.getLiquidityValue = function getLiquidityValue(token, totalSupply, liquidity, feeOn, kLast) {
    if (feeOn === void 0) {
      feeOn = false;
    }
    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    !totalSupply.token.equals(this.liquidityToken) ?  invariant(false, 'TOTAL_SUPPLY')  : void 0;
    !liquidity.token.equals(this.liquidityToken) ?  invariant(false, 'LIQUIDITY')  : void 0;
    !JSBI.lessThanOrEqual(liquidity.raw, totalSupply.raw) ?  invariant(false, 'LIQUIDITY')  : void 0;
    var totalSupplyAdjusted;
    if (!feeOn) {
      totalSupplyAdjusted = totalSupply;
    } else {
      !!!kLast ?  invariant(false, 'K_LAST')  : void 0;
      var kLastParsed = parseBigintIsh(kLast);
      if (!JSBI.equal(kLastParsed, ZERO)) {
        var rootK = sqrt(JSBI.multiply(this.reserve0.raw, this.reserve1.raw));
        var rootKLast = sqrt(kLastParsed);
        if (JSBI.greaterThan(rootK, rootKLast)) {
          var numerator = JSBI.multiply(totalSupply.raw, JSBI.subtract(rootK, rootKLast));
          var denominator = JSBI.add(JSBI.multiply(rootK, FIVE), rootKLast);
          var feeLiquidity = JSBI.divide(numerator, denominator);
          totalSupplyAdjusted = totalSupply.add(new TokenAmount(this.liquidityToken, feeLiquidity));
        } else {
          totalSupplyAdjusted = totalSupply;
        }
      } else {
        totalSupplyAdjusted = totalSupply;
      }
    }
    return new TokenAmount(token, JSBI.divide(JSBI.multiply(liquidity.raw, this.reserveOf(token).raw), totalSupplyAdjusted.raw));
  };
  _createClass(Pair, [{
    key: "chainId",
    get: function get() {
      return this.token0.chainId;
    }
  }, {
    key: "token0",
    get: function get() {
      return this.tokenAmounts[0].token;
    }
  }, {
    key: "token1",
    get: function get() {
      return this.tokenAmounts[1].token;
    }
  }, {
    key: "reserve0",
    get: function get() {
      return this.tokenAmounts[0];
    }
  }, {
    key: "reserve1",
    get: function get() {
      return this.tokenAmounts[1];
    }
  }]);
  return Pair;
}();

var Price = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Price, _Fraction);
  // denominator and numerator _must_ be raw, i.e. in the native representation
  function Price(baseCurrency, quoteCurrency, denominator, numerator) {
    var _this;
    _this = _Fraction.call(this, numerator, denominator) || this;
    _this.baseCurrency = baseCurrency;
    _this.quoteCurrency = quoteCurrency;
    _this.scalar = new Fraction(JSBI.exponentiate(TEN, JSBI.BigInt(baseCurrency.decimals)), JSBI.exponentiate(TEN, JSBI.BigInt(quoteCurrency.decimals)));
    return _this;
  }
  Price.fromRoute = function fromRoute(route) {
    var prices = [];
    for (var _iterator = _createForOfIteratorHelperLoose(route.pairs.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
        i = _step$value[0],
        pair = _step$value[1];
      prices.push(route.path[i].equals(pair.token0) ? new Price(pair.reserve0.currency, pair.reserve1.currency, pair.reserve0.raw, pair.reserve1.raw) : new Price(pair.reserve1.currency, pair.reserve0.currency, pair.reserve1.raw, pair.reserve0.raw));
    }
    return prices.slice(1).reduce(function (accumulator, currentValue) {
      return accumulator.multiply(currentValue);
    }, prices[0]);
  };
  var _proto = Price.prototype;
  _proto.invert = function invert() {
    return new Price(this.quoteCurrency, this.baseCurrency, this.numerator, this.denominator);
  };
  _proto.multiply = function multiply(other) {
    !currencyEquals(this.quoteCurrency, other.baseCurrency) ?  invariant(false, 'TOKEN')  : void 0;
    var fraction = _Fraction.prototype.multiply.call(this, other);
    return new Price(this.baseCurrency, other.quoteCurrency, fraction.denominator, fraction.numerator);
  }
  // performs floor division on overflow
  ;
  _proto.quote = function quote(currencyAmount) {
    !currencyEquals(currencyAmount.currency, this.baseCurrency) ?  invariant(false, 'TOKEN')  : void 0;
    if (this.quoteCurrency instanceof Token) {
      return new TokenAmount(this.quoteCurrency, _Fraction.prototype.multiply.call(this, currencyAmount.raw).quotient);
    }
    return CurrencyAmount.ether(_Fraction.prototype.multiply.call(this, currencyAmount.raw).quotient);
  };
  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }
    return this.adjusted.toSignificant(significantDigits, format, rounding);
  };
  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 4;
    }
    return this.adjusted.toFixed(decimalPlaces, format, rounding);
  };
  _createClass(Price, [{
    key: "raw",
    get: function get() {
      return new Fraction(this.numerator, this.denominator);
    }
  }, {
    key: "adjusted",
    get: function get() {
      return _Fraction.prototype.multiply.call(this, this.scalar);
    }
  }]);
  return Price;
}(Fraction);

var Route = /*#__PURE__*/function () {
  function Route(pairs, input, output) {
    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !pairs.every(function (pair) {
      return pair.chainId === pairs[0].chainId;
    }) ?  invariant(false, 'CHAIN_IDS')  : void 0;
    !(input instanceof Token && pairs[0].involvesToken(input) || input === ETHER && pairs[0].involvesToken(WETH[pairs[0].chainId])) ?  invariant(false, 'INPUT')  : void 0;
    !(typeof output === 'undefined' || output instanceof Token && pairs[pairs.length - 1].involvesToken(output) || output === ETHER && pairs[pairs.length - 1].involvesToken(WETH[pairs[0].chainId])) ?  invariant(false, 'OUTPUT')  : void 0;
    var path = [input instanceof Token ? input : WETH[pairs[0].chainId]];
    for (var _iterator = _createForOfIteratorHelperLoose(pairs.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
        i = _step$value[0],
        pair = _step$value[1];
      var currentInput = path[i];
      !(currentInput.equals(pair.token0) || currentInput.equals(pair.token1)) ?  invariant(false, 'PATH')  : void 0;
      var _output = currentInput.equals(pair.token0) ? pair.token1 : pair.token0;
      path.push(_output);
    }
    this.pairs = pairs;
    this.path = path;
    this.midPrice = Price.fromRoute(this);
    this.input = input;
    this.output = output !== null && output !== void 0 ? output : path[path.length - 1];
  }
  _createClass(Route, [{
    key: "chainId",
    get: function get() {
      return this.pairs[0].chainId;
    }
  }]);
  return Route;
}();

var _100_PERCENT = /*#__PURE__*/new Fraction(_100);
var Percent = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Percent, _Fraction);
  function Percent() {
    return _Fraction.apply(this, arguments) || this;
  }
  var _proto = Percent.prototype;
  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 5;
    }
    return this.multiply(_100_PERCENT).toSignificant(significantDigits, format, rounding);
  };
  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 2;
    }
    return this.multiply(_100_PERCENT).toFixed(decimalPlaces, format, rounding);
  };
  return Percent;
}(Fraction);

// returns the percent difference between the mid price and the execution price
// we call this price impact in the UI
function computePriceImpact(midPrice, inputAmount, outputAmount) {
  var exactQuote = midPrice.raw.multiply(inputAmount.raw);
  // calculate slippage := (exactQuote - outputAmount) / exactQuote
  var slippage = exactQuote.subtract(outputAmount.raw).divide(exactQuote);
  return new Percent(slippage.numerator, slippage.denominator);
}
// comparator function that allows sorting trades by their output amounts, in decreasing order, and then input amounts
// in increasing order. i.e. the best trades have the most outputs for the least inputs and are sorted first
function inputOutputComparator(a, b) {
  // must have same input and output token for comparison
  !currencyEquals(a.inputAmount.currency, b.inputAmount.currency) ?  invariant(false, 'INPUT_CURRENCY')  : void 0;
  !currencyEquals(a.outputAmount.currency, b.outputAmount.currency) ?  invariant(false, 'OUTPUT_CURRENCY')  : void 0;
  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      return 0;
    }
    // trade A requires less input than trade B, so A should come first
    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    // tradeA has less output than trade B, so should come second
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1;
    } else {
      return -1;
    }
  }
}
// extension of the input output comparator that also considers other dimensions of the trade in ranking them
function tradeComparator(a, b) {
  var ioComp = inputOutputComparator(a, b);
  if (ioComp !== 0) {
    return ioComp;
  }
  // consider lowest slippage next, since these are less likely to fail
  if (a.priceImpact.lessThan(b.priceImpact)) {
    return -1;
  } else if (a.priceImpact.greaterThan(b.priceImpact)) {
    return 1;
  }
  // finally consider the number of hops since each hop costs gas
  return a.route.path.length - b.route.path.length;
}
/**
 * Given a currency amount and a chain ID, returns the equivalent representation as the token amount.
 * In other words, if the currency is ETHER, returns the WETH token amount for the given chain. Otherwise, returns
 * the input currency amount.
 */
function wrappedAmount(currencyAmount, chainId) {
  if (currencyAmount instanceof TokenAmount) return currencyAmount;
  if (currencyAmount.currency === ETHER) return new TokenAmount(WETH[chainId], currencyAmount.raw);
    invariant(false, 'CURRENCY')  ;
}
function wrappedCurrency(currency, chainId) {
  if (currency instanceof Token) return currency;
  if (currency === ETHER) return WETH[chainId];
    invariant(false, 'CURRENCY')  ;
}
var Trade = /*#__PURE__*/function () {
  function Trade(route, amount, tradeType) {
    var amounts = new Array(route.path.length);
    var nextPairs = new Array(route.pairs.length);
    if (tradeType === exports.TradeType.EXACT_INPUT) {
      !currencyEquals(amount.currency, route.input) ?  invariant(false, 'INPUT')  : void 0;
      amounts[0] = wrappedAmount(amount, route.chainId);
      for (var i = 0; i < route.path.length - 1; i++) {
        var pair = route.pairs[i];
        var _pair$getOutputAmount = pair.getOutputAmount(amounts[i]),
          outputAmount = _pair$getOutputAmount[0],
          nextPair = _pair$getOutputAmount[1];
        amounts[i + 1] = outputAmount;
        nextPairs[i] = nextPair;
      }
    } else {
      !currencyEquals(amount.currency, route.output) ?  invariant(false, 'OUTPUT')  : void 0;
      amounts[amounts.length - 1] = wrappedAmount(amount, route.chainId);
      for (var _i = route.path.length - 1; _i > 0; _i--) {
        var _pair = route.pairs[_i - 1];
        var _pair$getInputAmount = _pair.getInputAmount(amounts[_i]),
          inputAmount = _pair$getInputAmount[0],
          _nextPair = _pair$getInputAmount[1];
        amounts[_i - 1] = inputAmount;
        nextPairs[_i - 1] = _nextPair;
      }
    }
    this.route = route;
    this.tradeType = tradeType;
    this.inputAmount = tradeType === exports.TradeType.EXACT_INPUT ? amount : route.input === ETHER ? CurrencyAmount.ether(amounts[0].raw) : amounts[0];
    this.outputAmount = tradeType === exports.TradeType.EXACT_OUTPUT ? amount : route.output === ETHER ? CurrencyAmount.ether(amounts[amounts.length - 1].raw) : amounts[amounts.length - 1];
    this.executionPrice = new Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.raw, this.outputAmount.raw);
    this.nextMidPrice = Price.fromRoute(new Route(nextPairs, route.input));
    this.priceImpact = computePriceImpact(route.midPrice, this.inputAmount, this.outputAmount);
  }
  // this is a misnomer for price impact, but kept for compatibility
  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  Trade.exactIn = function exactIn(route, amountIn) {
    return new Trade(route, amountIn, exports.TradeType.EXACT_INPUT);
  }
  /**
   * Constructs an exact out trade with the given amount out and route
   * @param route route of the exact out trade
   * @param amountOut the amount returned by the trade
   */;
  Trade.exactOut = function exactOut(route, amountOut) {
    return new Trade(route, amountOut, exports.TradeType.EXACT_OUTPUT);
  }
  // get the minimum amount that must be received from this trade for the given slippage tolerance
  ;
  var _proto = Trade.prototype;
  _proto.minimumAmountOut = function minimumAmountOut(slippageTolerance) {
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, 'SLIPPAGE_TOLERANCE')  : void 0;
    if (this.tradeType === exports.TradeType.EXACT_OUTPUT) {
      return this.outputAmount;
    } else {
      var slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(this.outputAmount.raw).quotient;
      return this.outputAmount instanceof TokenAmount ? new TokenAmount(this.outputAmount.token, slippageAdjustedAmountOut) : CurrencyAmount.ether(slippageAdjustedAmountOut);
    }
  }
  // get the maximum amount in that can be spent via this trade for the given slippage tolerance
  ;
  _proto.maximumAmountIn = function maximumAmountIn(slippageTolerance) {
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, 'SLIPPAGE_TOLERANCE')  : void 0;
    if (this.tradeType === exports.TradeType.EXACT_INPUT) {
      return this.inputAmount;
    } else {
      var slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(this.inputAmount.raw).quotient;
      return this.inputAmount instanceof TokenAmount ? new TokenAmount(this.inputAmount.token, slippageAdjustedAmountIn) : CurrencyAmount.ether(slippageAdjustedAmountIn);
    }
  }
  // given a list of pairs, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
  // amount to an output token, making at most `maxHops` hops
  // note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
  // the amount in among multiple routes.
  ;
  Trade.bestTradeExactIn = function bestTradeExactIn(pairs, currencyAmountIn, currencyOut, _temp,
  // used in recursion.
  currentPairs, originalAmountIn, bestTrades) {
    var _ref = _temp === void 0 ? {} : _temp,
      _ref$maxNumResults = _ref.maxNumResults,
      maxNumResults = _ref$maxNumResults === void 0 ? 3 : _ref$maxNumResults,
      _ref$maxHops = _ref.maxHops,
      maxHops = _ref$maxHops === void 0 ? 3 : _ref$maxHops;
    if (currentPairs === void 0) {
      currentPairs = [];
    }
    if (originalAmountIn === void 0) {
      originalAmountIn = currencyAmountIn;
    }
    if (bestTrades === void 0) {
      bestTrades = [];
    }
    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !(maxHops > 0) ?  invariant(false, 'MAX_HOPS')  : void 0;
    !(originalAmountIn === currencyAmountIn || currentPairs.length > 0) ?  invariant(false, 'INVALID_RECURSION')  : void 0;
    var chainId = currencyAmountIn instanceof TokenAmount ? currencyAmountIn.token.chainId : currencyOut instanceof Token ? currencyOut.chainId : undefined;
    !(chainId !== undefined) ?  invariant(false, 'CHAIN_ID')  : void 0;
    var amountIn = wrappedAmount(currencyAmountIn, chainId);
    var tokenOut = wrappedCurrency(currencyOut, chainId);
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];
      // pair irrelevant
      if (!pair.token0.equals(amountIn.token) && !pair.token1.equals(amountIn.token)) continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO)) continue;
      var amountOut = void 0;
      try {
        ;
        var _pair$getOutputAmount2 = pair.getOutputAmount(amountIn);
        amountOut = _pair$getOutputAmount2[0];
      } catch (error) {
        // input too low
        if (error.isInsufficientInputAmountError) {
          continue;
        }
        throw error;
      }
      // we have arrived at the output token, so this is the final trade of one of the paths
      if (amountOut.token.equals(tokenOut)) {
        sortedInsert(bestTrades, new Trade(new Route([].concat(currentPairs, [pair]), originalAmountIn.currency, currencyOut), originalAmountIn, exports.TradeType.EXACT_INPUT), maxNumResults, tradeComparator);
      } else if (maxHops > 1 && pairs.length > 1) {
        var pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length));
        // otherwise, consider all the other paths that lead from this token as long as we have not exceeded maxHops
        Trade.bestTradeExactIn(pairsExcludingThisPair, amountOut, currencyOut, {
          maxNumResults: maxNumResults,
          maxHops: maxHops - 1
        }, [].concat(currentPairs, [pair]), originalAmountIn, bestTrades);
      }
    }
    return bestTrades;
  }
  // similar to the above method but instead targets a fixed output amount
  // given a list of pairs, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
  // to an output token amount, making at most `maxHops` hops
  // note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
  // the amount in among multiple routes.
  ;
  Trade.bestTradeExactOut = function bestTradeExactOut(pairs, currencyIn, currencyAmountOut, _temp2,
  // used in recursion.
  currentPairs, originalAmountOut, bestTrades) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
      _ref2$maxNumResults = _ref2.maxNumResults,
      maxNumResults = _ref2$maxNumResults === void 0 ? 3 : _ref2$maxNumResults,
      _ref2$maxHops = _ref2.maxHops,
      maxHops = _ref2$maxHops === void 0 ? 3 : _ref2$maxHops;
    if (currentPairs === void 0) {
      currentPairs = [];
    }
    if (originalAmountOut === void 0) {
      originalAmountOut = currencyAmountOut;
    }
    if (bestTrades === void 0) {
      bestTrades = [];
    }
    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !(maxHops > 0) ?  invariant(false, 'MAX_HOPS')  : void 0;
    !(originalAmountOut === currencyAmountOut || currentPairs.length > 0) ?  invariant(false, 'INVALID_RECURSION')  : void 0;
    var chainId = currencyAmountOut instanceof TokenAmount ? currencyAmountOut.token.chainId : currencyIn instanceof Token ? currencyIn.chainId : undefined;
    !(chainId !== undefined) ?  invariant(false, 'CHAIN_ID')  : void 0;
    var amountOut = wrappedAmount(currencyAmountOut, chainId);
    var tokenIn = wrappedCurrency(currencyIn, chainId);
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];
      // pair irrelevant
      if (!pair.token0.equals(amountOut.token) && !pair.token1.equals(amountOut.token)) continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO)) continue;
      var amountIn = void 0;
      try {
        ;
        var _pair$getInputAmount2 = pair.getInputAmount(amountOut);
        amountIn = _pair$getInputAmount2[0];
      } catch (error) {
        // not enough liquidity in this pair
        if (error.isInsufficientReservesError) {
          continue;
        }
        throw error;
      }
      // we have arrived at the input token, so this is the first trade of one of the paths
      if (amountIn.token.equals(tokenIn)) {
        sortedInsert(bestTrades, new Trade(new Route([pair].concat(currentPairs), currencyIn, originalAmountOut.currency), originalAmountOut, exports.TradeType.EXACT_OUTPUT), maxNumResults, tradeComparator);
      } else if (maxHops > 1 && pairs.length > 1) {
        var pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length));
        // otherwise, consider all the other paths that arrive at this token as long as we have not exceeded maxHops
        Trade.bestTradeExactOut(pairsExcludingThisPair, currencyIn, amountIn, {
          maxNumResults: maxNumResults,
          maxHops: maxHops - 1
        }, [pair].concat(currentPairs), originalAmountOut, bestTrades);
      }
    }
    return bestTrades;
  };
  _createClass(Trade, [{
    key: "slippage",
    get: function get() {
      return this.priceImpact;
    }
  }]);
  return Trade;
}();

function toHex(currencyAmount) {
  return "0x" + currencyAmount.raw.toString(16);
}
var ZERO_HEX = '0x0';
/**
 * Represents the Uniswap V2 Router, and has static methods for helping execute trades.
 */
var Router = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Router() {}
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */
  Router.swapCallParameters = function swapCallParameters(trade, options) {
    var etherIn = trade.inputAmount.currency === ETHER;
    var etherOut = trade.outputAmount.currency === ETHER;
    // the router does not support both ether in and out
    !!(etherIn && etherOut) ?  invariant(false, 'ETHER_IN_OUT')  : void 0;
    !(options.ttl > 0) ?  invariant(false, 'TTL')  : void 0;
    var to = validateAndParseAddress(options.recipient);
    var amountIn = toHex(trade.maximumAmountIn(options.allowedSlippage));
    var amountOut = toHex(trade.minimumAmountOut(options.allowedSlippage));
    var path = trade.route.path.map(function (token) {
      return token.address;
    });
    var deadline = "0x" + (Math.floor(new Date().getTime() / 1000) + options.ttl).toString(16);
    var useFeeOnTransfer = Boolean(options.feeOnTransfer);
    var methodName;
    var args;
    var value;
    switch (trade.tradeType) {
      case exports.TradeType.EXACT_INPUT:
        if (etherIn) {
          methodName = useFeeOnTransfer ? 'swapExactETHForTokensSupportingFeeOnTransferTokens' : 'swapExactETHForTokens';
          // (uint amountOutMin, address[] calldata path, address to, uint deadline)
          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = useFeeOnTransfer ? 'swapExactTokensForETHSupportingFeeOnTransferTokens' : 'swapExactTokensForETH';
          // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = useFeeOnTransfer ? 'swapExactTokensForTokensSupportingFeeOnTransferTokens' : 'swapExactTokensForTokens';
          // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        }
        break;
      case exports.TradeType.EXACT_OUTPUT:
        !!useFeeOnTransfer ?  invariant(false, 'EXACT_OUT_FOT')  : void 0;
        if (etherIn) {
          methodName = 'swapETHForExactTokens';
          // (uint amountOut, address[] calldata path, address to, uint deadline)
          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = 'swapTokensForExactETH';
          // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = 'swapTokensForExactTokens';
          // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        }
        break;
    }
    return {
      methodName: methodName,
      args: args,
      value: value
    };
  };
  return Router;
}();

exports.JSBI = JSBI;
exports.Currency = Currency;
exports.CurrencyAmount = CurrencyAmount;
exports.ETHER = ETHER;
exports.FACTORY_ADDRESS = FACTORY_ADDRESS;
exports.Fraction = Fraction;
exports.INIT_CODE_HASH = INIT_CODE_HASH;
exports.InsufficientInputAmountError = InsufficientInputAmountError;
exports.InsufficientReservesError = InsufficientReservesError;
exports.MINIMUM_LIQUIDITY = MINIMUM_LIQUIDITY;
exports.Pair = Pair;
exports.Percent = Percent;
exports.Price = Price;
exports.Route = Route;
exports.Router = Router;
exports.Token = Token;
exports.TokenAmount = TokenAmount;
exports.Trade = Trade;
exports.WETH = WETH;
exports.currencyEquals = currencyEquals;
exports.inputOutputComparator = inputOutputComparator;
exports.tradeComparator = tradeComparator;
//# sourceMappingURL=sdk.cjs.development.js.map
