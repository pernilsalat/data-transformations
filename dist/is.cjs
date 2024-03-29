"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const complement = require("./complement.cjs");
const isNil = (x) => x === null || x === void 0;
function isType(targetType, x) {
  if (arguments.length === 1)
    return (_x) => isType(targetType, _x);
  return !isNil(x) && typeof x === targetType;
}
function isStrict(targetConstructor, x) {
  if (arguments.length === 1)
    return (_x) => isStrict(targetConstructor, _x);
  return !isNil(x) && x.constructor === targetConstructor;
}
function _is(targetPrototype, x) {
  if (arguments.length === 1)
    return (_x) => _is(targetPrototype, _x);
  return isStrict(targetPrototype, x) || x instanceof targetPrototype;
}
const isArray = (x) => Array.isArray(x);
const isFunction = isType("function");
const isString = isType("string");
const isObject = isStrict(Object);
const isFunctor = (x) => isFunction(x == null ? void 0 : x.map);
const isFilterable = (x) => isFunction(x == null ? void 0 : x.filter);
const isSet = _is(Set);
const isMap = _is(Map);
const isIterable = (x) => isFunction(x == null ? void 0 : x[Symbol.iterator]);
const isGeneratorFunction = (v) => Object.prototype.toString.call(v) === "[object GeneratorFunction]";
const isTransducer = (x) => isFunction(x == null ? void 0 : x["@@transducer/step"]);
const isPromise = _is(Promise);
const isThenable = (x) => isFunction(x == null ? void 0 : x.then);
/**
 * **[Curried function]**
 *
 *
 * See if an object (`val`) is an instance of the supplied constructor.
 * This function will check up the inheritance chain, if any.
 * * Additionally, it has the following methods for nicer and more semantic
 * type checking:
 * array -
 * function -
 * functor -
 * filterable -
 * generator -
 * iterator -
 * map -
 * object (strict checking) -
 * promise -
 * set -
 * string -
 * thenable -
 * transducer -
 * type -
 * strict -
 * nil -
 * not (negates any of the previous ones)
 * * @func
 * @category Type
 * @param {Object} ctor A constructor
 * @param {*} val The value to test
 * @return {Boolean}
 * @property {function(*): boolean}  [array]   - Checks if is an Array
 * @property {function(*): boolean}  [function]   - Checks if is type function
 * @property {function(*): boolean}  [functor]   - Checks if it has a map method
 * @property {function(*): boolean}  [filterable]   - Checks if it has a filter method
 * @property {function(*): boolean}  [generator]   - Checks if it is a generator function
 * @property {function(*): boolean}  [iterator]   - Checks if it has [Symbol.iterator] method
 * @property {function(*): boolean}  [map]   - Checks if it is a Map or an instance of a Map
 * @property {function(*): boolean}  [object]   - Checks if the constructor equals to Object (if it is strictly an object)
 * @property {function(*): boolean}  [promise]   - Checks if it is a Promise or an instance of a Promise
 * @property {function(*): boolean}  [set]   - Checks if it is a Set or an instance of a Set
 * @property {function(*): boolean}  [string]   - Checks if it is boolean type
 * @property {function(*): boolean}  [thenable]   - Checks if it has a then method
 * @property {function(*): boolean}  [transducer]   - Checks if it is an object that follows the transducer protocol
 * @property {function(string, *): boolean}  [type]   - Checks if the type matches
 * @property {function(Function, *): boolean}  [strict]   - Checks if the constructor function matches
 * @property {function(*): boolean}  [nil]   - Checks if it is null or undefined
 * @property {Object}  [not]   - negates the following method
 * @property {function(*): boolean}  [not.array]   - Checks if is not an Array
 * @property {function(*): boolean}  [not.function]   - Checks if is not type function
 * @property {function(*): boolean}  [not.functor]   - Checks if it has not a map method
 * @property {function(*): boolean}  [not.filterable]   - Checks if it has not a filter method
 * @property {function(*): boolean}  [not.generator]   - Checks if it is not a generator function
 * @property {function(*): boolean}  [not.iterator]   - Checks if it has not [Symbol.iterator] method
 * @property {function(*): boolean}  [not.map]   - Checks if it is not a Map nor an instance of a Map
 * @property {function(*): boolean}  [not.object]   - Checks if the constructor not equals to Object (if it is strictly not an object)
 * @property {function(*): boolean}  [not.promise]   - Checks if it is not a Promise nor an instance of a Promise
 * @property {function(*): boolean}  [not.set]   - Checks if it is not a Set nor an instance of a Set
 * @property {function(*): boolean}  [not.string]   - Checks if it is not boolean type
 * @property {function(*): boolean}  [not.thenable]   - Checks if it has not a then method
 * @property {function(*): boolean}  [not.transducer]   - Checks if it is not an object that follows the transducer protocol
 * @property {function(string, *): boolean}  [not.type]   - Checks if the type do not matches matches
 * @property {function(Function, *): boolean}  [not.strict]   - Checks if the constructor function do not matches
 * @property {function(*): boolean}  [not.nil]   - Checks if it is not null or undefined
 * @example
 * is.object([]); => false
 * is(Object, []); //=> true
 * is(Object, {}); //=> true
 * is(Number, 1); //=> true
 * is(Object, 1); //=> false
 * is(String, 's'); //=> true
 * is(String, new String('')); //=> true
 * is(Object, new String('')); //=> true
 * is(Object, 's'); //=> false
 * is(Number, {}); //=> false
 * is.function(() => {}); => true
 * is.not.function(() => {}); => false
 *
 * @preserve true
 */
const is = Object.assign(_is, {
  array: isArray,
  function: isFunction,
  functor: isFunctor,
  filterable: isFilterable,
  generator: isGeneratorFunction,
  iterator: isIterable,
  map: isMap,
  object: isObject,
  promise: isPromise,
  set: isSet,
  string: isString,
  thenable: isThenable,
  transducer: isTransducer,
  type: isType,
  strict: isStrict,
  nil: isNil,
  not: {
    array: complement.complement(isArray),
    function: complement.complement(isFunction),
    functor: complement.complement(isFunctor),
    filterable: complement.complement(isFilterable),
    generator: complement.complement(isGeneratorFunction),
    iterator: complement.complement(isIterable),
    map: complement.complement(isMap),
    object: complement.complement(isObject),
    promise: complement.complement(isPromise),
    set: complement.complement(isSet),
    string: complement.complement(isString),
    thenable: complement.complement(isThenable),
    transducer: complement.complement(isTransducer),
    type: complement.complement(isType),
    strict: complement.complement(isStrict),
    nil: complement.complement(isNil)
  }
});
exports.is = is;
//# sourceMappingURL=is.cjs.map
