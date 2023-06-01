import { filter } from '#utils/filter.js';

import H from './helpers/index.js';

describe('filter', function () {
  it('should filter an array', function () {
    const r = filter(H.filterers.isEven, H.array);

    expect(r).toEqual([0, 2]);
  });

  it('should filter an object', function () {
    const r = filter(H.filterers.isEven, H.object);

    expect(r).toEqual({ b: 0, c: 2 });
  });

  it('should filter a functor', function () {
    const r = filter(H.filterers.isEven, H.method);

    expect(r).toEqual('method: filter');
  });

  it('should filter a string', function () {
    const r = filter(H.filterers.isVowel, H.string);

    expect(r).toEqual('oaiei');
  });

  it('should filter a set', function () {
    const e = new Set([0, 2]);
    const r = filter(H.filterers.isEven, H.set);

    expect(r).toEqual(e);
  });

  it('should filter a Map', function () {
    const e = new Map([
      ['b', 0],
      ['c', 2],
    ]);
    const r = filter(H.filterers.isEvenEntryValue, H.map);

    expect(r).toEqual(e);
  });

  it('should filter an iterator', function () {
    const r = filter(H.filterers.startsWithVowel, H.iterable);

    expect(r).toEqual(['apple', 'orange']);
  });

  it('should filter a generator function', function () {
    const r = filter(H.filterers.startsWithVowel, H.generator);

    expect(r).toEqual(['apple', 'orange']);
  });

  it('should filter a generator', function () {
    const r = filter(H.filterers.startsWithVowel, H.generator());

    expect(r).toEqual(['apple', 'orange']);
  });
});
