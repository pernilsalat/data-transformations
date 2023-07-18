import { curry } from '#utils/curry.js';
import { get } from '#utils/internal/get.js';
import { reducers } from '#utils/internal/reducers.js';
import { toTransducer } from '#utils/internal/toTransducer.js';

/**
 * **[Curried function]**
 *
 *
 * Returns a single item by iterating through the collection, successively calling the iterator
 * function and passing it an accumulator value and the current value from the array, and
 * then passing the result to the next call.
 *
 * The iterator function receives: **(acc, value, index, collection)**. while reducing an object
 * it receives: **(acc, [value, key], collection)**.
 * It may use `reduced` to stop the iteration.
 *
 * It also accepts a transducer instead of an iterator function.
 *
 * Note: `reduce` does not skip deleted or unassigned indices (sparse arrays), unlike
 * the native `Array.prototype.reduce` method. For more details on this behavior, see:
 * [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description)
 * @see reduced
 *
 * @func
 * @category List
 * @param {Function} transducer The iterator function. Receives four values: the accumulator, the
 * current element from the Iterable, the iteration index and the whole Iterable. It also accepts a Transducer
 * @param {*} initial The accumulator initial value.
 * @param {Collection} collection An Iterable parameter.
 * @return {*} The final, accumulated value.
 * @example
 *
 * const add = (acc, act) => a + b;
 *
 * reduce(add, 'normal', 'string'); //=> 'normal string'
 * reduce(add, 10, [1, 2, 3]); //=> 16
 * reduce(add, 10, Set[1, 2, 3]); //=> 16
 * reduce(add, 10, function* () { yield* [1, 2, 3]}); //=> 16
 * reduce(add, '', { a: 1, b: 2 }); //=> 'a,1b,2'
 * reduce(add, '', Map{ a: 1, b: 2 }); //=> 'a,1b,2'
 *
 * @preserve true
 */
export const reduce = curry(function reduce(transducer, initial, collection) {
  let _transducer = toTransducer(transducer);

  const type = get.type(collection, 'reduce');

  if (type in reducers) {
    const result = reducers[type](_transducer, initial, collection);

    return _transducer['@@transducer/result'](result);
  }

  throw new TypeError('reduce: collection type not supported: ' + type);
});
