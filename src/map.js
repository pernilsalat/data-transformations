import { get } from '#utils/internal/get.js';
import { mapper } from '#utils/internal/mappers.js';

/**
 * **[Curried function]**
 *
 *
 * Returns a new Iterable, constructed by applying the supplied function to every element of the
 * supplied list.
 *
 * When mapping an object, the function mapper accepts **(value, key, object)**
 * In any other case, the mapper function accepts **(value, index, collection)**. The value comes from
 * the iterator of the collection.
 *
 * Note: `map` does not skip deleted or unassigned indices (sparse arrays), unlike the
 * native `Array.prototype.map` method. For more details on this behavior, see:
 * [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Description)
 *
 * Acts as a transducer if a transformer is given as second parameter.
 * @see transduce
 *
 * @func
 * @category List
 * @param {Function} fn The function to be called on every element of the input `Iterable`.
 * @param {Collection} [collection] The Iterable to be iterated over.
 * @return {Collection|Function} The new Iterable or curried function.
 * @example
 *
 * const toUpperCase = (x) => x.toUpperCase();
 * const double = (x) => x * 2;
 * const doubleValue = ([k, v]) => [k, v * 2];
 *
 * map(toUpperCase, 'aeiou'); //=> 'AEIOU'
 * map(double, [1, 2, 3]); //=> [2, 4, 6]
 * map(double, Set[1, 2, 3]); //=> Set[2, 4, 6]
 * map(double, function* () { yield* [1, 2, 3]}); //=> [2, 4, 6]
 * map(double, { a: 1, b: 2 }); //=> { a: 2, b: 4 }
 * map(doubleValue, Map{ a: 1, b: 2 }); //=> Map{ a: 2, b: 4 }
 *
 * @preserve true
 */
export function map(fn, collection) {
  if (arguments.length === 1) return (_collection) => map(fn, _collection);

  if (typeof fn !== 'function') {
    throw new TypeError(
      `map: Please provide a Function for the first argument`,
    );
  }

  const type = get.type(collection, 'map');

  if (type in mapper) {
    return mapper[type](fn, collection);
  }

  throw new TypeError('map: collection type not supported: ' + type);
}
