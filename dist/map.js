import { g as get } from "./get-3e246b66.js";
import { a as xmap } from "./transducers-2bb5eb4f.js";
const mapArray = (fn, m) => {
  const len = m.length;
  const result = new Array(len);
  for (let idx = 0; idx < len; idx++) {
    result[idx] = fn(m[idx], idx, m);
  }
  return result;
};
const mapString = (fn, m) => {
  const length = m.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    const char = m[i];
    result += fn(char, i, m);
  }
  return result;
};
const mapObj = (fn, m) => {
  const obj = {};
  const keys = Object.keys(m);
  const length = keys.length;
  for (let i = 0; i < length; i++) {
    const k = keys[i];
    const v = m[k];
    obj[k] = fn(v, k, m);
  }
  return obj;
};
const mapFunctor = (fn, m) => m.map(fn);
const mapIterator = (fn, it, m) => {
  let step = it.next();
  let result = [];
  let idx = 0;
  let value;
  while (!step.done) {
    value = fn(step.value, idx++, m);
    result.push(value);
    step = it.next();
  }
  return result;
};
const mapIterable = (fn, m) => {
  const it = m[Symbol.iterator].bind(m);
  return mapIterator(fn, it(), m);
};
const mapConstructableIterable = (fn, m) => {
  const value = mapIterable(fn, m);
  return new m.constructor(value);
};
const mapper = {
  "[object Array]": mapArray,
  "[object Method]": mapFunctor,
  "[object Transducer]": xmap,
  "[object Iterator]": mapIterable,
  "[object Set]": mapConstructableIterable,
  "[object Map]": mapConstructableIterable,
  "[object Object]": mapObj,
  "[object String]": mapString,
  "[object GeneratorFunction]": (fn, m) => mapIterator(fn, m(), m),
  "[object Generator]": (fn, m) => mapIterator(fn, m, m)
};
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
function map(fn, collection) {
  if (arguments.length === 1)
    return (_collection) => map(fn, _collection);
  if (typeof fn !== "function") {
    throw new TypeError(
      `map: Please provide a Function for the first argument`
    );
  }
  const type = get.type(collection, "map");
  if (type in mapper) {
    return mapper[type](fn, collection);
  }
  throw new TypeError("map: collection type not supported: " + type);
}
export {
  map
};
//# sourceMappingURL=map.js.map
