import { curryN } from '#utils/curryN.js';

/**
 * **[Curried function]**
 *
 *
 * Creates a function that is bound to a context.
 * Note: `bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @category Function
 * @category Object
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @example
 * const log = bind(console.log, console);
 * pipe(inc, log, double)(2); //=> 6
 * // logs: 3
 *
 * @preserve true
 */
export function bind(fn, thisObj) {
  if (arguments.length === 1) {
    return (_thisObj) => bind(fn, _thisObj);
  }

  return curryN(fn.length, (...args) => fn.apply(thisObj, args));
}
