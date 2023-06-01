/**
 * Takes a function `f` and returns a function `g` such that:
 *
 *   - applying `g` to zero or more arguments will give __true__ if applying
 *     the same arguments to `f` gives a logical __false__ value; and
 *
 *   - applying `g` to zero or more arguments will give __false__ if applying
 *     the same arguments to `f` gives a logical __true__ value.
 *
 * @func
 * @category Logic
 * @param {Function} fn
 * @return {Function}
 * @example
 *
 * const isEven = (n) => n % 2 === 0;
 * const isOdd = complement(isEven);
 *
 * isOdd(21); //=> true
 * isOdd(42); //=> false
 *
 * @preserve true
 */
function complement(fn) {
  return (...args) => !fn(...args);
}
export {
  complement
};
//# sourceMappingURL=complement.js.map
