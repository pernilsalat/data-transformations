/**
 * @typedef {Object} Transducer
 * @property {Function}  `@@transducer/init`    - Function: () => any, Hook called at the beginning to compute the initial state
 * @property {Function}  `@@transducer/result`  - Function: (state) => any, Hook called when the result is computed
 * @property {Function}  `@@transducer/step`    - Function: (state, value, index, collection) => any, Hook called at every iteration
 * @description
 * see [The Transducer Protocol](https://github.com/cognitect-labs/transducers-js/tree/master#the-transducer-protocol)
 *
 * @preserve true
 */

/**
 * @typedef {Array|Object|Transducer|Set|Map|string|Iterator|GeneratorFunction|Generator|Iterable} Collection
 *
 * @preserve true
 */
