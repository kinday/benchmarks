const Benny = require('benny')
const assert = require('assert')

const KEY = 'app.title'
const LANGUAGE = 'en'
const IDENTIFIER = `${LANGUAGE}:${KEY}`

function check(data) {
  assert(data.toString() === IDENTIFIER, 'Nope')
}

Benny.suite(
  'New Objects creation',

  Benny.add('Plain object', () => {
    function create(language, key) {
      const data = {
        key,
        language,
        toString() {
          return `${this.language}:${this.key}`
        },
      }

      return data
    }

    check(create(LANGUAGE, KEY))

    return () => {
      const data = create(LANGUAGE, KEY)
      data.toString()
    }
  }),

  Benny.add('Object without prototype', () => {
    function create(language, key) {
      const data = Object.create(null)

      data.key = key
      data.language = language
      data.toString = function toString() {
        return `${this.language}:${this.key}`
      }

      return data
    }

    check(create(LANGUAGE, KEY))

    return () => {
      const data = create(LANGUAGE, KEY)
      data.toString()
    }
  }),

  Benny.add('Map', () => {
    class Data extends Map {
      toString() {
        return `${this.get('language')}:${this.get('key')}`
      }
    }

    function create(language, key) {
      const data = new Data([
        ['language', language],
        ['key', key],
      ])

      return data
    }

    check(create(LANGUAGE, KEY))

    return () => {
      const data = create(LANGUAGE, KEY)
      data.toString()
    }
  }),

  Benny.cycle(),
  Benny.complete()
)
