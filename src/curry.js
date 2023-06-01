/**
 * Returns a curried equivalent of the provided function. The curried
 * function has two unusual capabilities. First, its arguments needn't
 * be provided one at a time. If `f` is a ternary function and `g` is
 * `curry(f)`, the following are equivalent:
 * - `g(1)(2)(3)`
 * - `g(1)(2, 3)`
 * - `g(1, 2)(3)`
 * - `g(1, 2, 3)`
 * @func
 * @category Function
 * @param {Function} fn The function to curry.
 * @param {...*} initialArgs The fn initial arguments.
 * @return {Function} A new, curried function.
 * @see curryN
 * @example
 * var addFourNumbers = function(a, b, c, d) {
 *   return a + b + c + d;
 * };
 * var curriedAddFourNumbers = curry(addFourNumbers);
 * var f = curriedAddFourNumbers(1, 2);
 * var g = f(3);
 * g(4); //=> 10
 *
 * @preserve true
 */
export function curry(fn, ...initialArgs) {
  return function curried(...args) {
    const totalArgs = [...initialArgs, ...args];
    if (totalArgs.length >= fn.length) {
      return fn.call(this, ...totalArgs);
    }
    return curry.call(this, fn, ...totalArgs);
  };
}
