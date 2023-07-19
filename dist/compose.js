/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 * @func
 * @category Function
 * @param {...Function} functions
 * @return {Function} a function that represents the composition of the arguments
 * @see pipe
 * @example
 * const inc = x => x + 1:
 * const negate = x => -x;
 *
 * var f = compose(inc, negate, Math.pow);
 * f(3, 4); // -(3^4) + 1
 *
 * @preserve true
 */
function compose(...functions) {
  if (arguments.length === 0) {
    throw new Error("compose requires at least one argument");
  }
  return function(x) {
    return functions.reduceRight((y, f) => f.call(this, y), x);
  };
}
export {
  compose
};
//# sourceMappingURL=compose.js.map
