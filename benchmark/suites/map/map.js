import { getSuite, testObject } from '#benchmark/generalConfig.js';
import { map } from '#dist/map.js';

const testMap = new Map(Object.entries(testObject));
const mapper = ([k, v]) => [k, v.toUpperCase()];

export default getSuite('map - Map')
  .add('Utils#map', function () {
    map(mapper, testMap);
  })
  .add('native#forOf', function () {
    const arr = [...testMap].map(mapper);

    new Map(arr);
  });
