const get = {
  // generator: (x) => {
  //   if (is.iterator(x)) {
  //     return function* () {
  //       let i = 0;
  //       for (const v of x) {
  //         yield [v, i++, x];
  //       }
  //     };
  //   }
  //
  //   if (is.object(x)) {
  //     return function* () {
  //       let i = 0;
  //       for (const v of Object.entries(x)) {
  //         yield [v, i++, x];
  //       }
  //     };
  //   }
  //
  //   throw new TypeError(`instance ${x} is not iterable`);
  // },
  type(x, method) {
    if (Array.isArray(x))
      return "[object Array]";
    let type = Object.prototype.toString.call(x);
    if (type === "[object Object]" || type === "[object Function]") {
      if (typeof x["@@transducer/step"] === "function") {
        type = "[object Transducer]";
      } else if (typeof x[method] === "function") {
        type = "[object Method]";
      } else if (typeof x[Symbol.iterator] === "function") {
        type = "[object Iterator]";
      }
    }
    return type;
  }
};
export {
  get as g
};
//# sourceMappingURL=get-3e246b66.js.map
