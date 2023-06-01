const arrayTake = (n, m) => {
  const len = m.length;
  let end = n > len ? len : n;
  if (end < 0) end += len + 1;
  const result = Array(end);

  for (let idx = 0; idx < end; idx++) {
    result[idx] = m[idx];
  }

  return result;
};

const stringTake = (n, m) => {
  let len = m.length;
  const _n = n < 0 ? n + 1 + len : n;
  const end = Math.min(_n, len);

  return m.slice(0, end);
};

const iteratorTake = (n, it, m) => {
  let step = it.next();
  let idx = 0;
  const len = m.length || m.size;

  const isNegative = n < 0;
  let extraElements = isNegative ? -n - 1 : 0;
  let result = [];

  let end = n;
  if (len) {
    end = n > len ? len : n;
    if (end < 0) end += len + 1;
    // result = new Array(end);
  }

  while ((isNegative || idx < end) && !step.done) {
    result.push(step.value);
    step = it.next();
    idx++;
  }
  result.length -= extraElements;

  return result;
};

const iterableTake = (n, m) => {
  const it = m[Symbol.iterator].bind(m);
  return iteratorTake(n, it(), m);
};
export const takes = {
  '[object Array]': arrayTake,
  '[object String]': stringTake,
  '[object Iterator]': iterableTake,
  '[object GeneratorFunction]': (n, m) => iteratorTake(n, m(), m),
  '[object Generator]': (n, m) => iteratorTake(n, m, m),
};
