// import { map } from '#dist/map.js';

// import { env } from '../../env.js';
import { getSuite } from '../../generalConfig.js';

// const testString = Arr(env.LENGTH).join();

// const mapper = (v) => String.fromCharCode((v % 26) + 97);

export default getSuite('take - string');
// .add('Utils#map', function () {
//   map(mapper, testString);
// })
// .add('native#split-map-join', function () {
//   testString.split('').map(mapper).join();
// })
// .add('native#string.replace', function () {
//   testString.replace(/[\s\S]/g, (x, i) => mapper(x, i, testString));
// });
