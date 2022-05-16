const Benny = require("benny");
const assert = require("assert");

const R = require("ramda");

function predicate(x, i) {
  return x * 2;
}

function check(fn) {
  assert.deepStrictEqual(
    fn([4, 8, 15, 16, 23, 42]),
    [8, 16, 30, 32, 46, 84],
    "Incorrect implementation"
  );
}

const FIBONACCI_SEQUENCE = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];

Benny.suite(
  "Array mapping",

  Benny.add("Array#map", () => {
    check((d) => d.map(predicate));

    return () => {
      FIBONACCI_SEQUENCE.map(predicate);
    };
  }),

  Benny.add("R.map", () => {
    check((d) => R.map(predicate, d));

    return () => {
      R.map(predicate, FIBONACCI_SEQUENCE);
    };
  }),

  Benny.add("for loop", () => {
    function map(fn, xs) {
      const ys = [];
      for (let i = 0; i < xs.length; i++) {
        ys.push(fn(xs[i]));
      }
      return ys;
    }

    check((d) => map(predicate, d));

    return () => {
      map(predicate, FIBONACCI_SEQUENCE);
    };
  }),

  Benny.cycle(),
  Benny.complete(),
  Benny.save({
    details: true,
    file: __filename.replace(__dirname, '').replace('.js', ''),
    folder: 'reports',
    format: 'json',
  })
);
