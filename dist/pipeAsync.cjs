"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const is = require("./is.cjs");
require("./complement.cjs");
/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary. If any function returns a
 * promise, it chains remaining ones
 *
 * @func
 * @async
 * @category Function
 * @param {...Function} functions
 * @return {Function} a function that represents the composition of the arguments
 * @see composeAsync
 * @example
 * var head = ([h]) => h;
 * var process = (a) => Promise.resolve(a);
 * var promiseAll = Promise.all.bind(Promise);
 *
 * var f = pipeAsync(process, promiseAll, head);
 *
 * f([1, 2]); // Promise.all([process(1), process(2)])[0] => 1
 *
 * @preserve true
 */
function pipeAsync(...functions) {
  if (arguments.length === 0) {
    throw new Error("pipeAsync requires at least one argument");
  }
  return async function(value) {
    let _value = value;
    for (const fn of functions) {
      _value = fn.call(this, _value);
      if (is.is.promise(_value)) {
        _value = await _value;
      }
    }
    return _value;
  };
}
exports.pipeAsync = pipeAsync;
//# sourceMappingURL=pipeAsync.cjs.map
