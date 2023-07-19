"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * @func
 * @category Function
 * @param {...Function} functions
 * @return {Function} a function that represents the composition of the arguments
 * @see compose
 * @example
 *
 * var f = pipe(Math.pow, toString);
 *
 * f(3, 4); // (3^4).toString()
 *
 * @preserve true
 */
function pipe(...functions) {
  if (arguments.length === 0) {
    throw new Error("pipe requires at least one argument");
  }
  return function(value) {
    return functions.reduce((acc, fn) => fn.call(this, acc), value);
  };
}
exports.pipe = pipe;
//# sourceMappingURL=pipe.cjs.map
