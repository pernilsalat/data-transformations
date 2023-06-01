function reduceArray(t, acc, m) {
  const len = m.length;
  let state = acc;

  for (let i = 0; i < len; i++) {
    state = t['@@transducer/step'](state, m[i], i, m);

    if (state?.['@@transducer/reduced']) {
      state = state['@@transducer/value'];
      break;
    }
  }

  return state;
}

function reduceMethod(t, acc, m) {
  return m.reduce(t['@@transducer/step'], acc, m);
}

function reduceIterator(t, acc, it, m) {
  let step = it.next();
  let state = acc;
  let idx = 0;

  while (!step.done) {
    state = t['@@transducer/step'](state, step.value, idx++, m);

    if (state?.['@@transducer/reduced']) {
      state = state['@@transducer/value'];
      break;
    }
    step = it.next();
  }

  return state;
}

function reduceObj(t, acc, m) {
  const keys = Object.keys(m);
  const len = keys.length;
  let state = acc;

  for (let i = 0; i < len; i++) {
    const k = keys[i];
    const v = m[k];
    state = t['@@transducer/step'](state, [k, v], m);

    if (state?.['@@transducer/reduced']) {
      state = state['@@transducer/value'];
      break;
    }
  }

  return state;
}

const reduceIterable = (t, acc, m) => {
  const it = m[Symbol.iterator].bind(m);
  return reduceIterator(t, acc, it(), m);
};

export const reducers = {
  '[object Array]': reduceArray,
  '[object Method]': reduceMethod,
  '[object Iterator]': reduceIterable,
  '[object Set]': reduceIterable,
  '[object Map]': reduceIterable,
  '[object Object]': reduceObj,
  '[object String]': reduceArray,
  '[object GeneratorFunction]': (t, acc, m) => reduceIterator(t, acc, m(), m),
  '[object Generator]': (t, acc, m) => reduceIterator(t, acc, m, m),
};
