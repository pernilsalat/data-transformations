import { curry } from '#utils/curry';

function buildString(a, b, c) {
  return `The ${a.toString(36)} ${b} ${c ? 'truth' : 'lie'}!`;
}

describe('curry', function () {
  it('should curry a single value', function () {
    const f = curry(buildString);
    const g = f(1);
    const h = g('a');
    const r = h(true);

    expect(r).toBe('The 1 a truth!');
  });

  it('should curry multiple values', function () {
    const f = curry(buildString);
    const g = f(1, 'a');
    const r = g(false);

    expect(r).toBe('The 1 a lie!');
  });

  it('should curry work with initial arguments', function () {
    const curried = curry(buildString, 1);
    const f = curried('*');
    const r = f(true);

    expect(r).toBe('The 1 * truth!');
  });
});
