"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
/**
 * Returns a curried equivalent of the provided function, with the
 * specified arity. The curried function has two unusual capabilities.
 * First, its arguments needn't be provided one at a time. If `g` is
 * `curryN(3, f)`, the following are equivalent:
 *
 * - `g(1)(2)(3)`
 * - `g(1)(2, 3)`
 * - `g(1, 2)(3)`
 * - `g(1, 2, 3)`
 *
 * @func
 * @category Function
 * @param {Number} arity The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @param {...*} initialArgs The function initial arguments.
 * @return {Function} A new, curried function.
 * @see curry
 * @example
 *
 * var addFourNumbers = function(a, b, c, d = 0) {
 *   return a + b + c + d;
 * };
 *
 * var curriedAddFourNumbers = curryN(3, addFourNumbers);
 * var f = curriedAddFourNumbers(1, 2);
 * f(3); //=> 6
 *
 * @preserve true
 */
function curryN(arity, fn, ...initialArgs) {
  return function curried(...args) {
    const totalArgs = [...initialArgs, ...args];
    if (totalArgs.length >= arity) {
      return fn.call(this, ...totalArgs);
    }
    return curryN.call(this, arity, fn, ...totalArgs);
  };
}
exports.curryN = curryN;
//# sourceMappingURL=curryN.cjs.map
