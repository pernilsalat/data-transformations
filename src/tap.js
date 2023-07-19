import { xtap } from '#utils/internal/transducers.js';

/**
 * **[Curried function]**
 *
 *
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
 * tap(sayX, 100); //=> 100
 * // logs 'x is 100'
 *
 * @preserve true
 */
export function tap(fn, x) {
  if (arguments.length === 1) return (_x) => tap(fn, _x);

  if (typeof x?.['@@transducer/step'] === 'function') {
    return xtap(fn, x);
  }

  fn(x);

  return x;
}
