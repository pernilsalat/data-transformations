export const track = (x) => {
  let count = {};
  const reset = () => {
    count = {};
  };

  return new Proxy(x, {
    get(target, p, receiver) {
      if (p === 'tracker') return count;
      if (p === 'resetTracker') return reset;

      count[p] ??= 0;
      count[p]++;

      return Reflect.get(target, p, receiver);
    },
    apply(target, thisArg, argArray) {
      count[target.name] ??= 0;
      count[target.name]++;

      return Reflect.apply(target, thisArg, argArray);
    },
  });
};
