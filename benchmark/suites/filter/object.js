import { filter as RBfilter } from 'rambda';
import { filter as Rfilter } from 'ramda';

import { getSuite, testObject } from '#benchmark/generalConfig.js';
import { filter } from '#dist/filter.js';

const filterer = (v) => /[aeiou]/.test(v);
export default getSuite('filter - object')
  .add('Ramda#filter', function () {
    Rfilter(filterer, testObject);
  })
  .add('Rambda#filter', function () {
    RBfilter(filterer, testObject);
  })
  .add('Utils#filter', function () {
    filter(filterer, testObject);
  })
  .add('native#fromEntries', function () {
    const newEntries = Object.entries(testObject).filter(([k, v]) => [
      k,
      filterer(v),
    ]);
    Object.fromEntries(newEntries);
  })
  .add('native#entries', function () {
    const obj = {};

    Object.entries(testObject).forEach(([k, v]) => {
      obj[k] = filterer(v, k, testObject);
    });
  });
