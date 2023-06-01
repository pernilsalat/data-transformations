import glob from 'glob';

import { args } from '#benchmark/args.js';

const __dirname = new URL('.', import.meta.url).pathname;

console.log(args); // eslint-disable-line

const files = glob
  .sync(`${__dirname}/suites/**/*${args.pattern}.js`)
  .map((file) => import(file).then((suite) => suite.default));

const suites = await Promise.all(files);

suites.forEach((suite) => suite.run());
