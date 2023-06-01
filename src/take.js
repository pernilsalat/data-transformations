import { get } from '#utils/internal/get.js';
import { takes } from '#utils/internal/takes.js';

/**
 * Returns the first `n` elements of the iterable.
 *
 * @func
 * @memberOf U
 * @category List
 * @param {Number} n
 * @param {Array|string|Iterator|GeneratorFunction|Generator} collection
 * @return {*}
 * @example
 * const names = names
 *
 * take(1, names); //=> ['foo']
 * take(1, function* () { yield* names }); //=> ['foo']
 * take(1, names); //=> ['foo']
 * take(2, names); //=> ['foo', 'bar']
 * take(3, names); //=> ['foo', 'bar', 'baz']
 * take(4, names); //=> ['foo', 'bar', 'baz']
 * take(3, 'ramda'); //=> 'ram'
 * take(1, Map{ a: 1, b: 2 }) => [['a', 1]]
 *
 * const personnel = [
 *  'Dave Brubeck',
 *  'Paul Desmond',
 *  'Eugene Wright',
 *  'Joe Morello',
 *  'Gerry Mulligan',
 *  'Bob Bates',
 *  'Joe Dodge',
 *  'Ron Crotty'
 * ];
 *
 * const takeTwo = take(2);
 * takeFive(personnel); //=> ['Dave Brubeck', 'Paul Desmond']
 *
 * @preserve
 */
export function take(n, collection) {
  if (arguments.length === 1) {
    return (_collection) => take(n, _collection);
  }

  if (typeof n !== 'number') {
    throw new TypeError(`take: Please provide a Number for the first argument`);
  }
  if (n === 0) return [];

  const type = get.type(collection);

  if (type in takes) {
    return takes[type](n, collection);
  }

  throw new TypeError('take: collection type not supported: ' + type);
}
