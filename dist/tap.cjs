"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const transducers = require("./transducers-27c304a0.cjs");
/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @func
 * @memberOf U
 * @category Function
 * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 * const sayX = x => console.log('x is ' + x);
 * R.tap(sayX, 100); //=> 100
 * // logs 'x is 100'
 *
 * @preserve true
 */
function tap(fn, x) {
  if (arguments.length === 1)
    return (_x) => tap(fn, _x);
  if (typeof (x == null ? void 0 : x["@@transducer/step"]) === "function") {
    return transducers.xtap(fn, x);
  }
  fn(x);
  return x;
}
exports.tap = tap;
//# sourceMappingURL=tap.cjs.map
