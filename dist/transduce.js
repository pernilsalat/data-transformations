import { curryN } from "./curryN.js";
import { r as reduce, t as toTransducer } from "./reduce-86de5073.js";
import { is } from "./is.js";
import "./curry.js";
import "./get-3e246b66.js";
import "./complement.js";
/**
 * **[Curried function]**
 *
 *
 * Initializes a transducer using supplied iterator function. Returns a single item by
 * iterating through the list, successively calling the transformed iterator function and
 * passing it an accumulator value and the current value from the array, and then passing
 * the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It will be wrapped as a
 * transformer to initialize the transducer. A transformer can be passed directly in place
 * of an iterator function.  In both cases, iteration may be stopped early with the
 * `reduced` function.
 *
 * A transducer is a function that accepts a transformer and returns a transformer and can
 * be composed directly.
 *
 * A transformer is an object that provides a 2-arity reducing iterator function, step,
 * 0-arity initial value function, init, and 1-arity result extraction function, result.
 * The step function is used as the iterator function in reduce. The result function is used
 * to convert the final accumulator into the return type and in most cases is the **identity** function.
 * The init function can be used to provide an initial accumulator, but is ignored by transduce.
 *
 * The iteration is performed with reduce after initializing the transducer.
 *
 * @func
 * @category List
 * @see reduce, reduced, into
 * @param {Function} transducer The transducer function. Receives a transformer and returns a transformer.
 * @param {Function} combine The iterator function. Receives two values, the accumulator and the
 *        current element from the array. Wrapped as transformer, if necessary, and used to
 *        initialize the transducer
 * @param {*} initial The initial accumulator value.
 * @param {Collection} collection The Iterable to iterate over.
 * @return {*} The final, accumulated value.
 * @example
 *
 * var t = transducers;
 * var inc = function(n) { return n+1; };
 * var isEven = function(n) { return n % 2 == 0; };
 * var apush = function(arr,x) { arr.push(x); return arr; };
 * var xf = compose(map(inc),filter(isEven));
 * transduce(xf, apush, [], [1,2,3,4]); // [2,4]
 *
 * @preserve true
 */
const transduce = curryN(
  3,
  function transduce2(transducer, combine, initial, collection) {
    let _initial = initial;
    let _collection = collection;
    if (arguments.length === 3) {
      if (is.function(combine)) {
        throw new TypeError(
          "If given only three arguments f must satisfy the ITransformer interface."
        );
      }
      _collection = initial;
      _initial = combine["@@transducer/init"]();
    }
    return reduce(transducer(toTransducer(combine)), _initial, _collection);
  }
);
export {
  transduce
};
//# sourceMappingURL=transduce.js.map
