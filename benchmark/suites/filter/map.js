import { getSuite, testObject } from '#benchmark/generalConfig.js';
import { filter } from '#dist/filter.js';

const testMap = new Map(Object.entries(testObject));
const filterer = ([, v]) => /[aeiou]/.test(v);
export default getSuite('filter - Map')
  .add('Utils#filter', function () {
    filter(filterer, testMap);
  })
  .add('native#forOf', function () {
    const arr = [...testMap].filter(filterer);

    new Map(arr);
  });
