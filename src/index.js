import { bind } from './bind.js';
import { complement } from './complement.js';
import { compose } from './compose.js';
import { composeAsync } from './composeAsync.js';
import { curry } from './curry.js';
import { curryN } from './curryN.js';
import { filter } from './filter.js';
import { into } from './into.js';
import { is } from './is.js';
import { map } from './map.js';
import { pipe } from './pipe.js';
import { pipeAsync } from './pipeAsync.js';
import { reduce } from './reduce.js';
import { reduced } from './reduced.js';
import { take } from './take.js';
import { tap } from './tap.js';
import { transduce } from './transduce.js';

const index = {
  bind,
  complement,
  compose,
  composeAsync,
  curry,
  curryN,
  filter,
  into,
  is,
  map,
  pipe,
  pipeAsync,
  reduce,
  reduced,
  take,
  tap,
  transduce,
};

export {
  bind,
  complement,
  compose,
  composeAsync,
  curry,
  curryN,
  index as default,
  filter,
  into,
  is,
  map,
  pipe,
  pipeAsync,
  reduce,
  reduced,
  take,
  tap,
  transduce,
};
