/* eslint-disable no-console */
import Benchmark from 'benchmark';

import { args } from '#benchmark/args.js';

export const getSuite = (name) =>
  new Benchmark.Suite(name, {
    onError(event) {
      console.log(
        `\nError: suit [${event.currentTarget.name}], run: [${event.target.name}] aborted`,
      );
      console.log(event.target.error);
      this.abort();
    },
    onStart(event) {
      console.log(event.currentTarget.name.toUpperCase());
      console.log();
    },
    onCycle(event) {
      console.log(String(event.target));
    },
    onComplete() {
      console.log('\nFastest is ' + this.filter('fastest').map('name'));
      console.log('------------------------------');
    },
  });

export const Arr = (n, mapper = (v, i) => i) => Array.from(Array(n), mapper);

const mapper = (v, i) => String.fromCharCode((i % 26) + 97);

export const Obj = (arr) => Object.fromEntries(Object.entries(arr));

export const testArray = Arr(args.length);

export const testMappedArray = Arr(args.length, mapper);

export const testObject = Obj(testMappedArray);
