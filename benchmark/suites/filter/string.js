import { getSuite, testArray } from '#benchmark/generalConfig.js';
import { filter } from '#dist/filter.js';

const testString = testArray.join();

const filterer = (v) => /[aeiou]/.test(v);

export default getSuite('filter - string')
  .add('Utils#filter', function () {
    filter(filterer, testString);
  })
  .add('native#split-filter-join', function () {
    testString.split('').filter(filterer).join();
  })
  .add('native#string.replace', function () {
    testString.replace(/[\s\S]/g, (x, i) =>
      filterer(x, i, testString) ? x : '',
    );
  });
