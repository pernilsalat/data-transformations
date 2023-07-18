import { combine } from '#utils/internal/combine.js';
import { transduce } from '#utils/transduce.js';

/**
 * @typedef  {Object} Into
 * @property {function(Function,Collection): Array}  [array]   - Function: (value, index, collection, accumulator) => any, Merge strategy: Array.push
 * @property {function(Function,Collection): string} [string]  - Function: (value, index, collection, accumulator) => any, Merge strategy: concatenation
 * @property {function(Function,Collection): number} [number]  - Function: (value, index, collection, accumulator) => any, Merge strategy: last returned value becomes the accumulator
 * @property {function(Function,Collection): Set}    [set]     - Function: (value, index, collection, accumulator) => any, Merge strategy: Set.add
 * @property {function(Function,Collection): Map}    [map]     - Function: ([key, value], index, collection, accumulator) => [any, any], Merge strategy: Map.add
 * @property {function(Function,Collection): Object} [object]  - Function: ([key, value], index, collection, accumulator) => [any, any], Merge strategy: object assignation
 * @preserve true
 */

/**
 * @description
 * Transforms the items of the iterable with the transducer and appends the transformed items to
 * the accumulator using an appropriate iterator function based on the accumulator type.
 *
 * The transducer function takes 4 params: (value, index, collection, accumulator). Then value
 * parameter is a pair [key, value] when the accumulator is an Object or a Map.
 *
 * In the case the accumulator is a number (into.number), there is no merge strategy and just
 * returns what the transducer returns
 *
 * The iteration is performed with reduce after initializing the transducer.
 *
 * All properties are **curried**.
 *
 * @type {Into}
 * @category Transformation
 * @example
 * var value = ([k, v]] => v
 * var isEven = (x) => x % 2 === 0
 * var isVowel = (x) => /aeiou/.test(x)
 * var isObject = (x) => typeof x === 'object'
 * var toUppercase = (x) => x.toUppercase()
 * var addAccumulator = (value, index, collection, accumulator) => value + accumulator
 * var pairById = (x) => [x.id, x]
 *
 * into.array(compose(map(value), filter(isEven)), {a: 1, b: 2}) // [2]
 *
 * into.string(compose(filter(isVowel), map(toUppercase)), 'string') // 'I'
 *
 * into.number(map(addAccumulator), [1, 2, 3]) // 1 + 2 + 3 = 6
 *
 * into.object(
 *   compose(filter(isObject), map(pairById)),
 *     [1, { id: '1-2-3', value: 10 }]
 *   ) // { '1-2-3': { id: '1-2-3', value: 10 } }
 *
 * @preserve true
 */
export const into = {
  array: function (transducer, collection) {
    if (arguments.length === 1)
      return (_collection) => into.array(transducer, _collection);

    return transduce(transducer, combine.push, [], collection);
  },
  string: function (transducer, collection) {
    if (arguments.length === 1)
      return (_collection) => into.string(transducer, _collection);

    return transduce(transducer, combine.concat, '', collection);
  },
  number: function (transducer, collection) {
    if (arguments.length === 1)
      return (_collection) => into.number(transducer, _collection);

    return transduce(transducer, combine.force, 0, collection);
  },
  set: function (transducer, collection) {
    if (arguments.length === 1)
      return (_collection) => into.set(transducer, _collection);

    return transduce(transducer, combine.add, new Set(), collection);
  },
  map: function (transducer, collection) {
    if (arguments.length === 1)
      return (_collection) => into.map(transducer, _collection);

    return transduce(transducer, combine.set, new Map(), collection);
  },
  object: function (transducer, collection) {
    if (arguments.length === 1)
      return (_collection) => into.object(transducer, _collection);

    return transduce(transducer, combine.merge, {}, collection);
  },
};
