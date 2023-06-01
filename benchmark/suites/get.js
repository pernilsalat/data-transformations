import { getSuite } from '#benchmark/generalConfig.js';
import { is } from '#dist/is.js';
import { get } from '#utils/internal/get.js';

const testVariable = {};
export default getSuite('get')
  .add('Utils#get', function () {
    get.type(testVariable);
  })
  .add('Utils#old', function () {
    gType(testVariable);
  });

const gType = (x) => {
  if (is.array(x)) return '[object Array]';

  if (is.transducer(x)) return '[object Transducer]'; ///////////////
  if (is.functor(x) || is.filterable(x)) return '[object Functor]'; //

  if (is.map(x)) return '[object Map]';
  if (is.string(x)) return '[object String]';

  if (is.iterator(x)) return '[object Iterator]'; ///////////////////

  if (is.object(x)) return '[object Object]';
  if (is.generator(x)) return '[object GeneratorFunction]';
};
