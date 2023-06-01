import { map } from '#utils/map.js';

import H from './helpers/index.js';

describe('map', function () {
  it('should map an array', function () {
    const r = map(H.mappers.double, H.array);

    expect(r).toEqual([-2, 0, 4, 6]);
  });

  it('should map an object', function () {
    const r = map(H.mappers.double, H.object);

    expect(r).toEqual({ a: -2, b: 0, c: 4, d: 6 });
  });

  it('should map a functor', function () {
    const r = map(H.mappers.double, H.method);

    expect(r).toEqual('method: map');
  });

  it('should map a string', function () {
    const r = map(H.mappers.toUppercase, H.string);

    expect(r).toEqual('NORMAL SIZE STRING');
  });

  it('should map a set', function () {
    const r = map(H.mappers.double, H.set);

    expect(r).toEqual(new Set([-2, 0, 4, 6]));
  });

  it('should map a Map', function () {
    const e = new Map([
      [-1, 'a'],
      [0, 'b'],
      [2, 'c'],
      [3, 'd'],
    ]);
    const r = map(H.mappers.swap, H.map);

    expect(r).toEqual(e);
  });

  it('should map an iterator', function () {
    const r = map(H.mappers.toUppercase, H.iterable);

    expect(r).toEqual(['APPLE', 'STRAWBERRY', 'ORANGE', 'MANGO', 'BANANA']);
  });

  it('should map a generator function', function () {
    const r = map(H.mappers.toUppercase, H.generator);

    expect(r).toEqual(['APPLE', 'STRAWBERRY', 'ORANGE', 'MANGO', 'BANANA']);
  });

  it('should map a generator', function () {
    const r = map(H.mappers.toUppercase, H.generator());

    expect(r).toEqual(['APPLE', 'STRAWBERRY', 'ORANGE', 'MANGO', 'BANANA']);
  });
});
