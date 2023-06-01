import { xmap } from '#utils/internal/transducers.js';

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
  let result = '';

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

export const mapper = {
  '[object Array]': mapArray,
  '[object Method]': mapFunctor,
  '[object Transducer]': xmap,
  '[object Iterator]': mapIterable,
  '[object Set]': mapConstructableIterable,
  '[object Map]': mapConstructableIterable,
  '[object Object]': mapObj,
  '[object String]': mapString,
  '[object GeneratorFunction]': (fn, m) => mapIterator(fn, m(), m),
  '[object Generator]': (fn, m) => mapIterator(fn, m, m),
};
