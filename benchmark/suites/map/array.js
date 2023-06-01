import { map as rbmap } from 'rambda';
import { map as rmap } from 'ramda';

import { getSuite, testArray } from '#benchmark/generalConfig.js';
import { map } from '#dist/map.js';

const mapper = (v) => String.fromCharCode((v % 26) + 97);
export default getSuite('map - array')
  .add('Ramda#map', function () {
    rmap(mapper, testArray);
  })
  .add('Rambda#map', function () {
    rbmap(mapper, testArray);
  })
  .add('Utils#map', function () {
    map(mapper, testArray);
  })
  .add('native#map', function () {
    testArray.map(mapper);
  });
// run async
// .run({ async: true });
