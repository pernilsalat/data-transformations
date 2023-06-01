import { compose } from '#utils/compose.js';
import { filter } from '#utils/filter.js';
import { map } from '#utils/map.js';

export const double = (n) => n * 2;
export const doubleValue = ([k, n]) => [k, n * 2];
export const isEven = (n) => n % 2 === 0;
export const isEvenValue = ([, n]) => n % 2 === 0;
export const toEntry = (v, i) => [i, v];
export const toUppercase = (s) => s.toUpperCase();
export const isVowel = (v) => /[aeiou]/.test(v);
const startsWithVowel = (s) => isVowel(s[0]);
class Methods {
  static map() {
    return 'method: map';
  }
  static filter() {
    return 'method: filter';
  }
  static reduce() {
    return 'method: reduce';
  }
}

class MakeIterator {
  constructor(data) {
    this.data = data;
  }
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        }

        return { done: true };
      },
    };
  }
}

export const iterator = new MakeIterator([
  'apple',
  'strawberry',
  'orange',
  'mango',
  'banana',
]);

export function* generator() {
  yield* iterator;
}

const createTransform = (tr) => {
  tr.add = (t) => compose(tr, t);

  return tr;
};

const arr = [-1, 0, 2, 3];
const obj = { a: -1, b: 0, c: 2, d: 3 };

export default {
  array: arr,
  object: obj,
  method: Methods,
  string: 'normal size string',
  map: new Map(Object.entries(obj)),
  set: new Set(arr),
  iterable: iterator,
  generator: generator,
  mappers: {
    double,
    doubleValue: ([, v]) => double(v),
    doubleEntryValue: ([, v]) => double(v),
    toUppercase: (s) => s.toUpperCase(),
    swap: ([k, v]) => [v, k],
    toEntry: toEntry,
  },
  filterers: {
    isEven: isEven,
    isEvenEntryValue: ([, v]) => isEven(v),
    isVowel: isVowel,
    startsWithVowel: (s) => isVowel(s[0]),
  },
  reducers: {
    add: (acc, act) => acc + act,
    addToSet: (acc, act) => acc.add(act),
    addEntryValue: (acc, [, v]) => acc + v,
    addEntryKey: (acc, [k]) => acc + k,
    countWords: (acc, act) => {
      acc[act] ??= 0;
      acc[act]++;
      return acc;
    },
    merge: (acc, [k, v]) => ({ ...acc, [k]: v }),
  },
  transforms: {
    value: createTransform(compose(filter(isEven), map(double))),
    entryValue: createTransform(compose(filter(isEvenValue), map(doubleValue))),
    string: createTransform(compose(filter(isVowel), map(toUppercase))),
    it: createTransform(compose(filter(startsWithVowel), map(toUppercase))),
    generator: createTransform(
      compose(filter(startsWithVowel), map(toUppercase)),
    ),
  },
};
