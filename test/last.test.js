import test from 'ava'

import last from '../last'

test('returns undefined for empty iterables', t => {
  const customEmpty = {
    * [Symbol.iterator] () {}
  }

  t.is(last([]), undefined)
  t.is(last(new Set()), undefined)
  t.is(last(new Map()), undefined)
  t.is(last(customEmpty), undefined)
})

test('returns the last value', t => {
  const customIterable = {
    * [Symbol.iterator] () {
      yield 1
      yield 2
      yield 3
    }
  }

  t.is(last([1]), 1)
  t.is(last(new Set([1, 2, 3])), 3)
  t.is(last(customIterable), 3)
})
