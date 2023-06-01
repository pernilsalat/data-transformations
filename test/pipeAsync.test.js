import { pipeAsync } from '#utils/pipeAsync.js';

import H from './helpers/index.js';

const head = ([h]) => h;
const resolve = (a) => Promise.resolve(a);
const promiseAll = Promise.all.bind(Promise);
const map = (fn) => (arr) => arr.map(fn);
describe('pipeAsync', function () {
  it('should should performs left-to-right async function composition', function () {
    const f = pipeAsync(map(resolve), promiseAll, head);
    const r = f(H.array);

    return expect(r).resolves.toBe(-1);
  });
});
