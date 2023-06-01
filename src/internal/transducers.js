const xfbase = (next) => ({
  '@@transducer/init': function () {
    return next['@@transducer/init']();
  },
  '@@transducer/result': function (state) {
    return next['@@transducer/result'](state);
  },
  '@@transducer/step': function () {
    throw new Error('Method not implemented');
  },
});

export const xtap = (fn, next) => ({
  ...xfbase(next),
  '@@transducer/step': function (state, v, i, m) {
    fn(v, i, m, state);

    return next['@@transducer/step'](state, v, i, m);
  },
});

export const xfilter = (predicate, next) => ({
  ...xfbase(next),
  '@@transducer/step': function (state, v, i, m) {
    if (predicate(v, i, m, state)) {
      return next['@@transducer/step'](state, v, i, m);
    }

    return state;
  },
});

export const xmap = (transform, next) => ({
  ...xfbase(next),
  '@@transducer/step': function (state, v, i, m) {
    return next['@@transducer/step'](state, transform(v, i, m, state), i, m);
  },
});
