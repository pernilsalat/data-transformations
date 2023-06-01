// mapArray :: ((a -> b), String a) -> String b
function* mapArray(fn, m) {
  const len = m.length;
  const result = new Array(len);

  for (let idx = 0; idx < len; idx++) {
    const value = fn(m[idx], idx, m);
    result[idx] = value;

    yield value;
  }

  return result;
}

// mapString :: ((a -> b), String a) -> String b
function* mapString(fn, m) {
  const length = m.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    const char = m[i];
    result += fn(char, i, m);

    yield char;
  }

  return result;
}

// mapObj :: (a -> b) -> { k: a } -> { k: b }
function* mapObj(fn, m) {
  const obj = {};
  const keys = Object.keys(m);
  const length = keys.length;

  for (let i = 0; i < length; i++) {
    const k = keys[i];
    const v = m[k];
    const value = fn(v, k, m);
    obj[k] = value;

    yield value;
  }

  return obj;
}

// mapFunctor :: Functor f => ((a -> b), f a) -> f b
function* mapFunctor(fn, m) {
  return yield* m.map(fn);
}

// mapIterator :: Functor f => ((a -> b), f a) -> f b
function* mapIterator(fn, m) {
  const arr = [];
  let idx = 0;

  for (const item of m) {
    const value = fn(item, idx, m);
    arr.push(value);
    idx += 1;

    yield value;
  }

  return arr;
}

function* mapMap(fn, m) {
  const returnValue = new m.constructor();

  for (const [k, v] of m) {
    const value = fn(v, k, m);
    returnValue.set(k, value);

    yield value;
  }

  return returnValue;
}

function* mapSet(fn, m) {
  const returnValue = new m.constructor();

  for (const item of m) {
    const value = fn(item, m);
    returnValue.add(value);

    yield value;
  }

  return returnValue;
}

// mapGenerator :: Functor f => ((a -> b), f a) -> f b
function* mapGenerator(fn, m) {
  const arr = [];

  for (const item of m()) {
    const value = fn(item, m);
    arr.push(value);

    yield value;
  }

  return arr;
}

const mapTransducer = function map(transform, next) {
  return {
    '@@transducer/init': function () {
      return next['@@transducer/init']();
    },
    '@@transducer/result': function (state) {
      return next['@@transducer/result'](state);
    },
    '@@transducer/step': function (state, v, i, m) {
      return next['@@transducer/step'](state, transform(v, i, m, state), i, m);
    },
  };
};

export const mapperGenerator = {
  '[object Array]': mapArray,
  '[object Method]': mapFunctor,
  '[object Transducer]': mapTransducer,
  '[object Iterator]': mapIterator,
  '[object Set]': mapSet,
  '[object Map]': mapMap,
  '[object Object]': mapObj,
  '[object String]': mapString,
  '[object GeneratorFunction]': mapGenerator,
};
