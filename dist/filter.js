import { x as xfilter } from "./transducers-2bb5eb4f.js";
import { g as get } from "./get-3e246b66.js";
const filterArray = (fn, m) => {
  const len = m.length;
  const result = [];
  for (let idx = 0; idx < len; idx++) {
    const v = m[idx];
    if (fn(v, idx, m)) {
      result.push(v);
    }
  }
  return result;
};
const filterString = (fn, m) => {
  const length = m.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    const char = m[i];
    if (fn(char, i, m)) {
      result += char;
    }
  }
  return result;
};
const filterObj = (fn, m) => {
  const obj = {};
  const keys = Object.keys(m);
  const length = keys.length;
  for (let i = 0; i < length; i++) {
    const k = keys[i];
    const v = m[k];
    if (fn(v, k, m)) {
      obj[k] = v;
    }
  }
  return obj;
};
const filterFilterable = (fn, m) => m.filter(fn);
const filterIterator = (fn, it, m) => {
  let step = it.next();
  let result = [];
  let idx = 0;
  while (!step.done) {
    if (fn(step.value, idx++, m)) {
      result.push(step.value);
    }
    step = it.next();
  }
  return result;
};
const filterIterable = (fn, m) => {
  const it = m[Symbol.iterator].bind(m);
  return filterIterator(fn, it(), m);
};
const filterConstructableIterable = (fn, m) => {
  const value = filterIterable(fn, m);
  return new m.constructor(value);
};
const filters = {
  "[object Array]": filterArray,
  "[object Method]": filterFilterable,
  "[object Transducer]": xfilter,
  "[object Iterator]": filterIterable,
  "[object Set]": filterConstructableIterable,
  "[object Map]": filterConstructableIterable,
  "[object Object]": filterObj,
  "[object String]": filterString,
  "[object GeneratorFunction]": (fn, m) => filterIterator(fn, m(), m),
  "[object Generator]": (fn, m) => filterIterator(fn, m, m)
};
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
function filter(fn, collection) {
  if (arguments.length === 1)
    return (_collection) => filter(fn, _collection);
  if (typeof fn !== "function") {
    throw new TypeError(
      `filter: Please provide a Function for the first argument`
    );
  }
  const type = get.type(collection, "filter");
  if (type in filters) {
    return filters[type](fn, collection);
  }
  throw new TypeError("filter: collection type not supported: " + type);
}
export {
  filter
};
//# sourceMappingURL=filter.js.map
