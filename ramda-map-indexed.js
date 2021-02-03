const Benny = require("benny");
const assert = require("assert");

const R = require("ramda");

function predicate(x, i) {
  return x * i;
}

function check(fn) {
  assert.deepStrictEqual(
    fn([4, 8, 15, 16, 23, 42]),
    [0, 8, 30, 48, 92, 210],
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

  Benny.add("R.addIndex(R.map)", () => {
    const mapIndexed = R.addIndex(R.map);

    check((d) => mapIndexed(predicate, d));

    return () => {
      mapIndexed(predicate, FIBONACCI_SEQUENCE);
    };
  }),

  Benny.add("for loop", () => {
    function map(fn, xs) {
      const ys = xs.slice(0);
      for (let i = 0; i < xs.length; i++) {
        ys[i] = fn(xs[i], i);
      }
      return ys;
    }

    check((d) => map(predicate, d));

    return () => {
      map(predicate, FIBONACCI_SEQUENCE);
    };
  }),

  Benny.cycle(),
  Benny.complete()
);
