"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
/**
 * Returns a value wrapped to indicate that it is the final value of the
 * reduce and transduce functions.  The returned value
 * should be considered a black box: the internal structure is not
 * guaranteed to be stable.
 *
 * @func
 * @category List
 * @see reduce, transduce
 * @param {*} state The final value of the reduce.
 * @return {*} The wrapped value.
 * @example
 *
 * reduce(
 *   pipe(add, ifElse(lte(10), reduced, identity)),
 *   0,
 *   [1, 2, 3, 4, 5]
 * ) // 10
 *
 * @preserve true
 */
const reduced = (state) => ({
  "@@transducer/value": state,
  "@@transducer/reduced": true
});
exports.reduced = reduced;
//# sourceMappingURL=reduced.cjs.map
