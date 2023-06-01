function* chunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

const defaultArgs = {
  length: 1000,
  n: 10,
  pattern: '',
};
const getArguments = () => {
  const args = {};

  const argv = process.argv.slice(2);

  for (const [_k, v] of chunks(argv, 2)) {
    const k = _k.replace(/^-+/g, '');

    args[k] = !isNaN(v) ? parseInt(v, 10) : v;
  }

  return { ...defaultArgs, ...args };
};

export const args = getArguments();
