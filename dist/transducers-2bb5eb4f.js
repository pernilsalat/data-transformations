const xfbase = (next) => ({
  "@@transducer/init": function() {
    return next["@@transducer/init"]();
  },
  "@@transducer/result": function(state) {
    return next["@@transducer/result"](state);
  },
  "@@transducer/step": function() {
    throw new Error("Method not implemented");
  }
});
const xtap = (fn, next) => ({
  ...xfbase(next),
  "@@transducer/step": function(state, v, i, m) {
    fn(v, i, m, state);
    return next["@@transducer/step"](state, v, i, m);
  }
});
const xfilter = (predicate, next) => ({
  ...xfbase(next),
  "@@transducer/step": function(state, v, i, m) {
    if (predicate(v, i, m, state)) {
      return next["@@transducer/step"](state, v, i, m);
    }
    return state;
  }
});
const xmap = (transform, next) => ({
  ...xfbase(next),
  "@@transducer/step": function(state, v, i, m) {
    return next["@@transducer/step"](state, transform(v, i, m, state), i, m);
  }
});
export {
  xmap as a,
  xtap as b,
  xfilter as x
};
//# sourceMappingURL=transducers-2bb5eb4f.js.map
