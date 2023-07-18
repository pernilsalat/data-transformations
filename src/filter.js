import { filters } from '#utils/internal/filters.js';
import { get } from '#utils/internal/get.js';

/**
 * **[Curried function]**
 *
 *
 * Returns a new list containing only those items that match a given predicate function.
 * The predicate function is passed: **(value, index, collection)**.
 * in the case of filtering and object, the predicate function is passed: **(value, key, collection)**.
 *
 * Note that `filter` does not skip deleted or unassigned indices, unlike the native
 * `Array.prototype.filter` method. For more details on this behavior, see:
 * [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Description)
 *
 * Acts as a transducer if a transformer is given as second parameter.
 * @see transduce
 *
 * @func
 * @category List
 * @param {Function} fn The function called per iteration.
 * @param {Collection} [collection] The collection to iterate over.
 * @return {Collection|Function} The new filtered array.
 * @example
 *
 * const isEven = (n) => n % 2 === 0;
 * const isValueEven = ([k, v]) => isEven(v)
 * const isVowel = (c) => /[aeiou]/.test(c);
 *
 * filter(isVowel, 'string'); //=> 'i'
 * filter(isEven, [1, 2, 3]); //=> [2]
 * filter(isEven, Set[1, 2, 3]); //=> Set[2]
 * filter(isEven, function* () { yield* [1, 2, 3]}); //=> [2]
 * filter(isEven, { a: 1, b: 2 }); //=> { b: 2 }
 * filter(isValueEven, Map{ a: 1, b: 2 }); //=> Map{ b: 2 }
 *
 * @preserve true
 */
export function filter(fn, collection) {
  if (arguments.length === 1) return (_collection) => filter(fn, _collection);

  if (typeof fn !== 'function') {
    throw new TypeError(
      `filter: Please provide a Function for the first argument`,
    );
  }

  const type = get.type(collection, 'filter');

  if (type in filters) {
    return filters[type](fn, collection);
  }

  throw new TypeError('filter: collection type not supported: ' + type);
}
