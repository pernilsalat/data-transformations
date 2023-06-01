import { map as rbmap } from 'rambda';
import { map as rmap } from 'ramda';

import { getSuite, testObject } from '#benchmark/generalConfig.js';
import { map } from '#dist/map.js';

const mapper = (v) => v.toUpperCase();

export default getSuite('map - object')
  .add('Ramda#map', function () {
    rmap(mapper, testObject);
  })
  .add('Rambda#map', function () {
    rbmap(mapper, testObject);
  })
  .add('Utils#map', function () {
    map(mapper, testObject);
  })
  .add('native#fromEntries', function () {
    const newEntries = Object.entries(testObject).map(([k, v]) => [
      k,
      mapper(v),
    ]);
    Object.fromEntries(newEntries);
  })
  .add('native#entries', function () {
    const obj = {};

    Object.entries(testObject).forEach(([k, v]) => {
      obj[k] = mapper(v, k, testObject);
    });
  });
