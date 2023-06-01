"use strict";
const curry = require("./curry.cjs");
const get = require("./get-6c5350df.cjs");
const is = require("./is.cjs");
function toTransducer(reducer, initial) {
  if (is.is.function(reducer["@@transducer/step"])) {
    return reducer;
  }
  return {
    "@@transducer/init": function() {
      if (initial !== void 0)
        return initial;
      throw new Error("Method not implemented");
    },
    "@@transducer/result": function(state) {
      return state;
    },
    "@@transducer/step": function(state, ...rest) {
      return reducer(state, ...rest);
    }
  };
}
function reduceArray(t, acc, m) {
  const len = m.length;
  let state = acc;
  for (let i = 0; i < len; i++) {
    state = t["@@transducer/step"](state, m[i], i, m);
    if (state == null ? void 0 : state["@@transducer/reduced"]) {
      state = state["@@transducer/value"];
      break;
    }
  }
  return state;
}
function reduceMethod(t, acc, m) {
  return m.reduce(t["@@transducer/step"], acc, m);
}
function reduceIterator(t, acc, it, m) {
  let step = it.next();
  let state = acc;
  let idx = 0;
  while (!step.done) {
    state = t["@@transducer/step"](state, step.value, idx++, m);
    if (state == null ? void 0 : state["@@transducer/reduced"]) {
      state = state["@@transducer/value"];
      break;
    }
    step = it.next();
  }
  return state;
}
function reduceObj(t, acc, m) {
  const keys = Object.keys(m);
  const len = keys.length;
  let state = acc;
  for (let i = 0; i < len; i++) {
    const k = keys[i];
    const v = m[k];
    state = t["@@transducer/step"](state, [k, v], m);
    if (state == null ? void 0 : state["@@transducer/reduced"]) {
      state = state["@@transducer/value"];
      break;
    }
  }
  return state;
}
const reduceIterable = (t, acc, m) => {
  const it = m[Symbol.iterator].bind(m);
  return reduceIterator(t, acc, it(), m);
};
const reducers = {
  "[object Array]": reduceArray,
  "[object Method]": reduceMethod,
  "[object Iterator]": reduceIterable,
  "[object Set]": reduceIterable,
  "[object Map]": reduceIterable,
  "[object Object]": reduceObj,
  "[object String]": reduceArray,
  "[object GeneratorFunction]": (t, acc, m) => reduceIterator(t, acc, m(), m),
  "[object Generator]": (t, acc, m) => reduceIterator(t, acc, m, m)
};
/**
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
const reduce = curry.curry(function reduce2(transducer, initial, collection) {
  let _transducer = toTransducer(transducer);
  const type = get.get.type(collection, "reduce");
  if (type in reducers) {
    const result = reducers[type](_transducer, initial, collection);
    return _transducer["@@transducer/result"](result);
  }
  throw new TypeError("reduce: collection type not supported: " + type);
});
exports.reduce = reduce;
exports.toTransducer = toTransducer;
//# sourceMappingURL=reduce-77e58b7e.cjs.map
