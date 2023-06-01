import { xfilter } from '#utils/internal/transducers.js';

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
  let result = '';

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

export const filters = {
  '[object Array]': filterArray,
  '[object Method]': filterFilterable,
  '[object Transducer]': xfilter,
  '[object Iterator]': filterIterable,
  '[object Set]': filterConstructableIterable,
  '[object Map]': filterConstructableIterable,
  '[object Object]': filterObj,
  '[object String]': filterString,
  '[object GeneratorFunction]': (fn, m) => filterIterator(fn, m(), m),
  '[object Generator]': (fn, m) => filterIterator(fn, m, m),
};
