import { take as RBtake } from 'rambda';
import { take as Rtake } from 'ramda';

import { args } from '#benchmark/args.js';
import { getSuite, testArray } from '#benchmark/generalConfig.js';
import { take } from '#dist/take.js';

const n = args.n;

export default getSuite('take - array')
  .add('Ramda#take', function () {
    Rtake(n, testArray);
  })
  .add('Rambda#take', function () {
    RBtake(n, testArray);
  })
  .add('Utils#take', function () {
    take(n, testArray);
  });
// .add('native#map', function () {
//   testArray.map(mapper);
// });
// run async
// .run({ async: true });
