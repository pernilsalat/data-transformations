import * as R from 'ramda';

import { getSuite, testArray } from '#benchmark/generalConfig.js';
import { compose } from '#dist/compose.js';
import { filter } from '#dist/filter.js';
import { into } from '#dist/into.js';
import { map } from '#dist/map.js';

const isVowel = (v) => /[aeiou]/.test(v);
const toEntries = (v) => [v, v.charCodeAt(0)];

const tr = R.compose(R.filter(isVowel), R.map(toEntries));

const tu = compose(filter(isVowel), map(toEntries));
export default getSuite('into - array')
  .add('Ramda#into', function () {
    R.into({}, tr, testArray);
  })
  .add('Utils#into', function () {
    into.object(tu, testArray);
  })
  .add('native#operations', function () {
    const entries = testArray.filter(isVowel).map(toEntries);

    Object.fromEntries(entries);
  });
// run async
// .run({ async: true });
