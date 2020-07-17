import test from 'ava'

import hasSameValues from '../hasSameValues.js'

const customIterable = {
  * [Symbol.iterator] () {
    yield 9
    yield 7
    yield 8
  }
}

test('returns true if the iterables have the same values', (t) => {
  t.is(hasSameValues([], []), true)
  t.is(hasSameValues([9, 8, 7], [7, 8, 9]), true)
  t.is(hasSameValues([9, 9, 9], [9, 9, 9]), true)

  t.is(hasSameValues(new Set([9, 8, 7]), [7, 8, 9]), true)
  t.is(hasSameValues([9, 8, 7], new Set([7, 8, 9])), true)

  t.is(hasSameValues([9, 8, 7], customIterable), true)
})

test("returns false if the iterables don't contain the same values", (t) => {
  t.is(hasSameValues([1], []), false)
  t.is(hasSameValues([], [1]), false)

  t.is(hasSameValues([1, 2, 3], [2, 3]), false)
  t.is(hasSameValues([2, 3], [1, 2, 3]), false)

  t.is(hasSameValues([1, 2, 3], [1, 1, 2, 3]), false)
  t.is(hasSameValues([1, 1, 2, 3], [1, 2, 3]), false)

  t.is(hasSameValues(new Set([1, 2, 3]), [2, 3]), false)
  t.is(hasSameValues([2, 3], new Set([1, 2, 3])), false)

  t.is(hasSameValues(new Set([1, 2, 3]), [1, 1, 2, 2, 3]), false)

  t.is(hasSameValues(customIterable, [7, 8]), false)
  t.is(hasSameValues([7, 8], customIterable), false)
})
