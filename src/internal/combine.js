export const combine = {
  push: (state = [], value) => (state.push(value), state),
  add: (state, value) => state.add(value),
  force: (state, value) => value,
  set: (state, [key, value]) => state.set(key, value),
  concat: (state, value) => state.concat(value),
  merge: (state, [key, value]) => {
    state[key] = value;

    return state;
  },
};
