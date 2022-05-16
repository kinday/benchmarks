const Benny = require("benny")
const assert = require("assert")

function double(x) {
  return x * 2
}

function check(right) {
  assert(right.map(double).right() === 10, "Incorrect implementation")
}

Benny.suite(
  "Either",

  Benny.add("Baseline", () => {
    function imperativeDouble(x) {
      if (x != null) {
        return double(x)
      }
    }

    return () => {
      double(5)
    }
  }),

  Benny.add("Class implementation", () => {
    class Right {
      constructor(value) {
        this.value = value
      }

      isLeft() {
        return false
      }

      isRight() {
        return true
      }

      map(f) {
        return Right.of(f(this.value))
      }

      right() {
        return this.value
      }

      static of(value) {
        return new Right(value)
      }
    }

    check(Right.of(5))

    return () => {
      Right.of(5)
        .map(double)
        .right()
    }
  }),

  Benny.add("Function implementation", () => {
    function Right(value) {
      return {
        isLeft() {
          return false
        },
        isRight() {
          return true
        },
        map(f) {
          return Right.of(f(value))
        },
        right() {
          return value
        },
      }
    }

    Right.of = function rightOf(value) {
      return Right(value)
    }

    check(Right.of(5))

    return () => {
      Right.of(5)
        .map(double)
        .right()
    }
  }),

  Benny.add("Object implementation", () => {
    const right = {
      isLeft() {
        return false
      },
      isRight() {
        return true
      },
      map(f) {
        return Right.of(f(this.value))
      },
      right() {
        return this.value
      },
    }

    const Right = {
      of(value) {
        const instance = Object.create(right)
        instance.value = value
        return instance
      },
    }

    check(Right.of(5))

    return () => {
      Right.of(5)
        .map(double)
        .right()
    }
  }),

  Benny.cycle(),
  Benny.complete(),
  Benny.save({
    file: __filename.replace(__dirname, '').replace('.js', ''),
    folder: 'reports',
    format: 'json',
  })
)
