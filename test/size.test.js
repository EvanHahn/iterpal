import test from 'ava'

import size from '../size'

test('returns the size of an iterable', t => {
  const customIterable = {
    * [Symbol.iterator] () {
      yield 'foo'
      yield 'bar'
      yield 'baz'
    }
  }

  t.is(size([]), 0)
  t.is(size(''), 0)
  t.is(size(new Set()), 0)
  t.is(size(new Map()), 0)

  t.is(size(['a']), 1)
  t.is(size('a'), 1)
  t.is(size(new Set(['a'])), 1)
  t.is(size(new Map([['a', 'b']])), 1)

  t.is(size(customIterable), 3)
})
