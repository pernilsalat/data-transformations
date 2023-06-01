import { reduce } from '#utils/reduce.js';
import { reduced } from '#utils/reduced.js';

import H from './helpers/index.js';

const reducerBreak = () => reduced('reduced');
describe('reduce', function () {
  it('should reduce an array', function () {
    const r = reduce(H.reducers.add, 0, H.array);

    expect(r).toEqual(4);
  });

  it('should reduce an object', function () {
    const r = reduce(H.reducers.addEntryKey, '', H.object);

    expect(r).toEqual('abcd');
  });

  it('should reduce a string', function () {
    const r = reduce(H.reducers.countWords, {}, H.string);

    expect(r).toEqual({
      ' ': 2,
      a: 1,
      e: 1,
      g: 1,
      i: 2,
      l: 1,
      m: 1,
      n: 2,
      o: 1,
      r: 2,
      s: 2,
      t: 1,
      z: 1,
    });
  });

  it('should reduce a Map', function () {
    const r = reduce(H.reducers.merge, {}, H.map);

    expect(r).toEqual({ a: -1, b: 0, c: 2, d: 3 });
  });

  it('should reduce a set', function () {
    const r = reduce(H.reducers.add, 0, H.set);

    expect(r).toEqual(4);
  });

  it('should reduce an iterator', function () {
    const r = reduce(H.reducers.addToSet, new Set(), H.iterable);

    expect(r).toEqual(new Set([...H.iterable]));
  });

  it('should break the execution if the reducer f returns reduced obj', function () {
    const r = reduce(reducerBreak, [], H.array);

    expect(r).toEqual('reduced');
  });
});
