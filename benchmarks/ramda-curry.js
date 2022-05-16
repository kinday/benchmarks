const Benny = require("benny");
const assert = require("assert");

const R = require("ramda");

function check(fn) {
  assert(fn(2) === 20, "Incorrect implementation");
}

Benny.suite(
  "Currying",

  Benny.add("Baseline (no currying)", () => {
    const multiply = (a, b) => a * b;

    check((b) => multiply(10, b));

    return () => {
      multiply(10, 2);
    };
  }),

  Benny.add("Higher-order function", () => {
    const multiply = (a) => (b) => a * b;

    check(multiply(10));

    const tenfold = multiply(10);
    return () => {
      multiply(2);
    };
  }),

  Benny.add("R.curry", () => {
    const multiply = R.curry((a, b) => a * b);

    check(multiply(10));

    const tenfold = multiply(10);
    return () => {
      multiply(2);
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
