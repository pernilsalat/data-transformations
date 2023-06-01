import { into } from '#utils/into.js';
import { map } from '#utils/map.js';

import H from './helpers/index.js';

const addValue = ([, v], i, m, acc) => acc + v;
const add = map((v, i, m, acc) => acc + v);
const addIndex = (v, i, m, acc) => acc + i;
const addLength = (v, i, m, acc) => acc + v.length;
const toEntry = map(H.mappers.toEntry);
const track = map((x, i, m, acc) => [x, (acc[x] || acc.get?.(x) || 0) + 1]);
const value = map(([, v]) => v);

describe('into', function () {
  describe('array', function () {
    it('should receive an array', function () {
      const r = into.array(H.transforms.value, H.array);

      expect(r).toEqual([0, 4]);
    });

    it('should receive an object', function () {
      const r = into.array(H.transforms.entryValue, H.object);

      expect(r).toEqual([
        ['b', 0],
        ['c', 4],
      ]);
    });

    it('should receive a Set', function () {
      const r = into.array(H.transforms.value, H.set);

      expect(r).toEqual([0, 4]);
    });

    it('should receive a Map', function () {
      const r = into.array(H.transforms.entryValue, H.map);

      expect(r).toEqual([
        ['b', 0],
        ['c', 4],
      ]);
    });

    it('should receive a string', function () {
      const r = into.array(H.transforms.string, H.string);

      expect(r).toEqual(['O', 'A', 'I', 'E', 'I']);
    });

    it('should receive an iterator', function () {
      const r = into.array(H.transforms.it, H.iterable);

      expect(r).toEqual(['APPLE', 'ORANGE']);
    });

    it('should receive a generator', function () {
      const r = into.array(H.transforms.generator, H.generator);

      expect(r).toEqual(['APPLE', 'ORANGE']);
    });
  });

  describe('object', function () {
    it('should receive an array', function () {
      const r = into.object(H.transforms.value.add(toEntry), H.array);

      expect(r).toEqual({ 1: 0, 2: 4 });
    });

    it('should receive an object', function () {
      const r = into.object(H.transforms.entryValue, H.object);

      expect(r).toEqual({ b: 0, c: 4 });
    });

    it('should receive a Set', function () {
      const r = into.object(H.transforms.value.add(toEntry), H.set);

      expect(r).toEqual({ 1: 0, 2: 4 });
    });

    it('should receive a Map', function () {
      const r = into.object(H.transforms.entryValue, H.map);

      expect(r).toEqual({ b: 0, c: 4 });
    });

    it('should receive a string', function () {
      const r = into.object(H.transforms.string.add(track), H.string);

      expect(r).toEqual({ A: 1, E: 1, I: 2, O: 1 });
    });

    it('should receive an iterator', function () {
      const r = into.object(H.transforms.it.add(toEntry), H.iterable);

      expect(r).toEqual({
        0: 'APPLE',
        2: 'ORANGE',
      });
    });

    it('should receive a generator', function () {
      const r = into.object(H.transforms.generator.add(toEntry), H.generator);

      expect(r).toEqual({
        0: 'APPLE',
        2: 'ORANGE',
      });
    });
  });

  describe('string', function () {
    it('should receive an array', function () {
      const r = into.string(H.transforms.value, H.array);

      expect(r).toEqual('04');
    });

    it('should receive an object', function () {
      const r = into.string(H.transforms.entryValue, H.object);

      expect(r).toEqual('b,0c,4');
    });

    it('should receive a Set', function () {
      const r = into.string(H.transforms.value, H.set);

      expect(r).toEqual('04');
    });

    it('should receive a Map', function () {
      const r = into.string(H.transforms.entryValue, H.map);

      expect(r).toEqual('b,0c,4');
    });

    it('should receive a string', function () {
      const r = into.string(H.transforms.string, H.string);

      expect(r).toEqual('OAIEI');
    });

    it('should receive an iterator', function () {
      const r = into.string(H.transforms.it, H.iterable);

      expect(r).toEqual('APPLEORANGE');
    });

    it('should receive a generator', function () {
      const r = into.string(H.transforms.generator, H.generator);

      expect(r).toEqual('APPLEORANGE');
    });
  });

  describe('set', function () {
    it('should receive an array', function () {
      const r = into.set(H.transforms.value, H.array);

      expect(r).toEqual(new Set([0, 4]));
    });

    it('should receive an object', function () {
      const r = into.set(H.transforms.entryValue.add(value), H.object);

      expect(r).toEqual(new Set([0, 4]));
    });

    it('should receive a Set', function () {
      const r = into.set(H.transforms.value, H.set);

      expect(r).toEqual(new Set([0, 4]));
    });

    it('should receive a Map', function () {
      const r = into.set(H.transforms.entryValue.add(value), H.map);

      expect(r).toEqual(new Set([0, 4]));
    });

    it('should receive a string', function () {
      const r = into.set(H.transforms.string, H.string);

      expect(r).toEqual(new Set(['O', 'A', 'I', 'E']));
    });

    it('should receive an iterator', function () {
      const r = into.set(H.transforms.it, H.iterable);
      const e = new Set(['APPLE', 'ORANGE']);

      expect(r).toEqual(e);
    });

    it('should receive a generator', function () {
      const r = into.set(H.transforms.generator, H.generator);
      const e = new Set(['APPLE', 'ORANGE']);

      expect(r).toEqual(e);
    });
  });

  describe('map', function () {
    it('should receive an array', function () {
      const r = into.map(H.transforms.value.add(toEntry), H.array);
      const e = new Map([
        [1, 0],
        [2, 4],
      ]);

      expect(r).toEqual(e);
    });

    it('should receive an object', function () {
      const r = into.map(H.transforms.entryValue, H.object);
      const e = new Map([
        ['b', 0],
        ['c', 4],
      ]);

      expect(r).toEqual(e);
    });

    it('should receive a Set', function () {
      const r = into.map(H.transforms.value.add(toEntry), H.set);
      const e = new Map([
        [1, 0],
        [2, 4],
      ]);

      expect(r).toEqual(e);
    });

    it('should receive a Map', function () {
      const r = into.map(H.transforms.entryValue, H.map);
      const e = new Map([
        ['b', 0],
        ['c', 4],
      ]);

      expect(r).toEqual(e);
    });

    it('should receive a string', function () {
      const r = into.map(H.transforms.string.add(track), H.string);
      const e = new Map([
        ['O', 1],
        ['A', 1],
        ['E', 1],
        ['I', 2],
      ]);

      expect(r).toEqual(e);
    });

    it('should receive an iterator', function () {
      const r = into.map(H.transforms.it.add(toEntry), H.iterable);
      const e = new Map([
        [0, 'APPLE'],
        [2, 'ORANGE'],
      ]);

      expect(r).toEqual(e);
    });

    it('should receive a generator', function () {
      const r = into.map(H.transforms.generator.add(toEntry), H.generator);
      const e = new Map([
        [0, 'APPLE'],
        [2, 'ORANGE'],
      ]);

      expect(r).toEqual(e);
    });
  });

  describe('number', function () {
    it('should receive an array', function () {
      const r = into.number(H.transforms.value.add(add), H.array);

      expect(r).toEqual(4);
    });

    it('should receive an object', function () {
      const r = into.number(
        H.transforms.entryValue.add(map(addValue)),
        H.object,
      );

      expect(r).toEqual(4);
    });

    it('should receive a Set', function () {
      const r = into.number(H.transforms.value.add(add), H.set);

      expect(r).toEqual(4);
    });

    it('should receive a Map', function () {
      const r = into.number(H.transforms.entryValue.add(map(addValue)), H.map);

      expect(r).toEqual(4);
    });

    it('should receive a string', function () {
      const r = into.number(H.transforms.string.add(map(addIndex)), H.string);

      expect(r).toEqual(38);
    });

    it('should receive an iterator', function () {
      const r = into.number(H.transforms.it.add(map(addLength)), H.iterable);

      expect(r).toEqual(11);
    });

    it('should receive a generator', function () {
      const r = into.number(
        H.transforms.generator.add(map(addLength)),
        H.generator,
      );

      expect(r).toEqual(11);
    });
  });
});
