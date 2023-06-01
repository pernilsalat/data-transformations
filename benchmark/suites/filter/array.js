import { filter as RBfilter } from 'rambda';
import { filter as Rfilter } from 'ramda';

import { getSuite, testArray } from '#benchmark/generalConfig.js';
import { filter } from '#dist/filter.js';

const filterer = (v) => v % 2 === 0;
export default getSuite('filter - array')
  .add('Ramda#filter', function () {
    Rfilter(filterer, testArray);
  })
  .add('Rambda#filter', function () {
    RBfilter(filterer, testArray);
  })
  .add('Utils#filter', function () {
    filter(filterer, testArray);
  })
  .add('native#filter', function () {
    testArray.filter(filterer);
  });
// run async
// .run({ async: true });
