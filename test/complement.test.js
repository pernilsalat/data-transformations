import { complement } from '#utils/complement.js';

const T = () => true;
describe('complement', function () {
  it('should return the complement', function () {
    const F = complement(T);

    expect(F()).toEqual(false);
  });
});
