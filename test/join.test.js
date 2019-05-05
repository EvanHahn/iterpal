import test from 'ava'

import join from '../join'

test('returns the empty string for empty iterables', t => {
  t.is(join([]), '')
  t.is(join([], '~'), '')
  t.is(join(new Set(), '~'), '')
})

test('joins iterables with commas by default', t => {
  const values = {
    [Symbol.iterator]: function * () {
      yield 'str'
      yield 1
      yield false
      yield undefined
      yield null
      yield NaN
      yield {
        toString () { return 'foo' }
      }
    }
  }

  t.is(join(values), 'str,1,false,,,NaN,foo')
})

test('can join iterables with other separators', t => {
  const values = {
    [Symbol.iterator]: function * () {
      yield 'str'
      yield 1
      yield false
      yield undefined
      yield null
      yield NaN
      yield {
        toString () { return 'foo' }
      }
    }
  }

  t.is(join(values, '~'), 'str~1~false~~~NaN~foo')
  t.is(join(values, ' and '), 'str and 1 and false and  and  and NaN and foo')
})
