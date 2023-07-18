import { g as get } from "./get-3e246b66.js";
const arrayTake = (n, m) => {
  const len = m.length;
  let end = n > len ? len : n;
  if (end < 0)
    end += len + 1;
  const result = Array(end);
  for (let idx = 0; idx < end; idx++) {
    result[idx] = m[idx];
  }
  return result;
};
const stringTake = (n, m) => {
  let len = m.length;
  const _n = n < 0 ? n + 1 + len : n;
  const end = Math.min(_n, len);
  return m.slice(0, end);
};
const iteratorTake = (n, it, m) => {
  let step = it.next();
  let idx = 0;
  const len = m.length || m.size;
  const isNegative = n < 0;
  let extraElements = isNegative ? -n - 1 : 0;
  let result = [];
  let end = n;
  if (len) {
    end = n > len ? len : n;
    if (end < 0)
      end += len + 1;
  }
  while ((isNegative || idx < end) && !step.done) {
    result.push(step.value);
    step = it.next();
    idx++;
  }
  result.length -= extraElements;
  return result;
};
const iterableTake = (n, m) => {
  const it = m[Symbol.iterator].bind(m);
  return iteratorTake(n, it(), m);
};
const takes = {
  "[object Array]": arrayTake,
  "[object String]": stringTake,
  "[object Iterator]": iterableTake,
  "[object GeneratorFunction]": (n, m) => iteratorTake(n, m(), m),
  "[object Generator]": (n, m) => iteratorTake(n, m, m)
};
/**
 * **[Curried function]**
 *
 *
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
function take(n, collection) {
  if (arguments.length === 1) {
    return (_collection) => take(n, _collection);
  }
  if (typeof n !== "number") {
    throw new TypeError(`take: Please provide a Number for the first argument`);
  }
  if (n === 0)
    return [];
  const type = get.type(collection);
  if (type in takes) {
    return takes[type](n, collection);
  }
  throw new TypeError("take: collection type not supported: " + type);
}
export {
  take
};
//# sourceMappingURL=take.js.map
