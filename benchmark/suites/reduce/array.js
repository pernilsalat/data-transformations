import { reduce as RBreduce } from 'rambda';
import { reduce as Rreduce } from 'ramda';

import { getSuite, testArray } from '#benchmark/generalConfig.js';
import { reduce } from '#dist/reduce.js';

const reducer = (acc, act) => acc + String.fromCharCode((act % 26) + 97);
export default getSuite('reduce - array')
  .add('Ramda#reduce', function () {
    Rreduce(reducer, '', testArray);
  })
  .add('Rambda#reduce', function () {
    RBreduce(reducer, '', testArray);
  })
  .add('Utils#reduce', function () {
    reduce(reducer, '', testArray);
  })
  .add('native#reduce', function () {
    testArray.reduce(reducer, '');
  });
// run async
// .run({ async: true });
