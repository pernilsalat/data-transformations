"use strict";
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
exports.xfilter = xfilter;
exports.xmap = xmap;
exports.xtap = xtap;
//# sourceMappingURL=transducers-27c304a0.cjs.map
