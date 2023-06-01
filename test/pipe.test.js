import { pipe } from '#utils/pipe.js';

const head = ([h]) => h;
const toStr = (v) => String(v);
const addStar = (v) => v + '*';

describe('pipe', function () {
  it('should performs left-to-right function composition', function () {
    const f = pipe(head, toStr, addStar);
    const r = f([5, 10, 15]);

    expect(r).toBe('5*');
  });
});
