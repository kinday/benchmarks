const Benny = require("benny")
const assert = require("assert")

const INPUT = ["a", "b", "c"]

function check(right) {
  assert(right.map(double).right() === 10, "Incorrect implementation")
}

Benny.suite(
  "String concat",

  Benny.add("Baseline", () => {
    function hardcodedConcat() {
      return INPUT[0] + " " + INPUT[1] + " " + INPUT[2]
    }

    return () => {
      hardcodedConcat()
    }
  }),

  Benny.add("for loop", () => {
    function concat(separator, strings) {
      let result = ""
      for (let i = 0; i < strings.length; i++) {
        result = result + separator + strings[i]
      }
      return result
    }

    return () => {
      concat(" ", INPUT)
    }
  }),

  Benny.add("for...of loop", () => {
    function concat(separator, strings) {
      let result = ""
      for (const s of strings) {
        result = result + separator + s
      }
      return result
    }

    return () => {
      concat(" ", INPUT)
    }
  }),

  Benny.add("Array#join", () => {
    return () => {
      INPUT.join(" ")
    }
  }),

  Benny.cycle(),
  Benny.complete()
)
