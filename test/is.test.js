import { is } from '#utils/is.js';

const nop = () => {};
const def = (value, passArr) => {
  const pass = passArr.reduce((acc, act) => ({ ...acc, [act]: true }), {});
  return { value, pass };
};
const properties = {
  array: def([], ['array']),
  function: def(nop, ['function', 'generator']),
  generator: def(function* () {}, ['generator']),
  iterator: def({ [Symbol.iterator]: nop }, [
    'array',
    'map',
    'set',
    'string',
    'iterator',
  ]),
  map: def(new Map(), ['map']),
  object: def({}, ['iterator', 'object']),
  promise: def(Promise.resolve(), ['promise']),
  set: def(new Set(), ['set']),
  string: def('', ['string']),
};

describe('is', function () {
  for (const propertiesKey in properties) {
    describe(`is.${propertiesKey}`, function () {
      for (const typeKey in properties) {
        const e = typeKey in properties[propertiesKey].pass;

        it(`should is.${propertiesKey}(${typeKey}) = ${e}`, function () {
          const { value } = properties[typeKey];
          const _is = is[propertiesKey];

          expect(_is(value)).toEqual(e);
        });
      }
    });
  }
});
