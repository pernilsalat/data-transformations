import { getSuite, testObject } from '#benchmark/generalConfig.js';
import { reduce } from '#dist/reduce.js';
export default getSuite('reduce - object')
  .add('Utils#reduce', function () {
    reduce(
      (acc, [, v]) => {
        acc[v] ??= 0;
        acc[v]++;
        return acc;
      },
      {},
      testObject,
    );
  })
  .add('native#Object.values', function () {
    const result = {};
    const values = Object.values(testObject);
    values.forEach((value) => {
      result[value] ??= 0;
      result[value]++;
    });
  })
  .add('native#for..in', function () {
    const result = {};

    for (const testObjectKey in testObject) {
      const value = testObject[testObjectKey];
      result[value] ??= 0;
      result[value]++;
    }
  });
