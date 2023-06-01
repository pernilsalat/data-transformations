import { is } from '#utils/is.js';

export function toTransducer(reducer, initial) {
  if (is.function(reducer['@@transducer/step'])) {
    return reducer;
  }

  return {
    '@@transducer/init': function () {
      if (initial !== undefined) return initial;
      throw new Error('Method not implemented');
    },
    '@@transducer/result': function (state) {
      return state;
    },
    '@@transducer/step': function (state, ...rest) {
      return reducer(state, ...rest);
    },
  };
}
