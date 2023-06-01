import { take } from '#utils/take.js';

import H from './helpers/index.js';

const allElements = [...H.iterable];
describe('take', function () {
  describe('case collection is Array', function () {
    it('should take all elements of the Array with n=-1', function () {
      const r = take(-1, allElements);

      expect(r).toEqual(allElements);
    });

    it('should take all elements of the Array with n=Infinity', function () {
      const r = take(Infinity, allElements);

      expect(r).toEqual(allElements);
    });

    it('should take the first 2 elements of the Array', function () {
      const r = take(2, allElements);

      expect(r).toEqual(allElements.slice(0, 2));
    });

    it('should take all but the last element of the Array', function () {
      const r = take(-2, allElements);

      expect(r).toEqual(allElements.slice(0, -1));
    });
  });
  describe('case collection is iterator', function () {
    it('should take all elements of the iterator with n=-1', function () {
      const r = take(-1, H.iterable);

      expect(r).toEqual(allElements);
    });

    it('should take all elements of the iterator with n=Infinity', function () {
      const r = take(Infinity, H.iterable);

      expect(r).toEqual(allElements);
    });

    it('should take the first 2 elements of the iterator', function () {
      const r = take(2, H.iterable);

      expect(r).toEqual(allElements.slice(0, 2));
    });

    it('should take all but the last element of the iterator', function () {
      const r = take(-2, H.iterable);

      expect(r).toEqual(allElements.slice(0, -1));
    });
  });
  describe('case collection is generator', function () {
    it('should take all elements of the generator with n=-1', function () {
      const r = take(-1, H.generator);

      expect(r).toEqual(allElements);
    });

    it('should take all elements of the generator with n=Infinity', function () {
      const r = take(Infinity, H.generator);

      expect(r).toEqual(allElements);
    });

    it('should take the first 2 elements of the generator', function () {
      const r = take(2, H.generator);

      expect(r).toEqual(allElements.slice(0, 2));
    });

    it('should take all but the last element of the generator', function () {
      const r = take(-2, H.generator);

      expect(r).toEqual(allElements.slice(0, -1));
    });
  });
  describe('case collection is string', function () {
    it('should take all elements of the string with n=-1', function () {
      const r = take(-1, H.string);

      expect(r).toEqual(H.string);
    });

    it('should take all elements of the string with n=Infinity', function () {
      const r = take(Infinity, H.string);

      expect(r).toEqual(H.string);
    });

    it('should take the first 2 elements of the string', function () {
      const r = take(2, H.string);

      expect(r).toEqual(H.string.slice(0, 2));
    });

    it('should take all but the last element of the string', function () {
      const r = take(-2, H.string);

      expect(r).toEqual(H.string.slice(0, -1));
    });
  });
});
