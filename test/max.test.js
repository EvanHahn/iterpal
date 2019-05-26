import test from 'ava'

import max from '../max'

test('returns undefined with an empty iterable', t => {
  t.is(max([]), undefined)
  t.is(max(new Set([])), undefined)
})

test('returns the largest number', t => {
  t.is(max([3, 1, 2]), 3)
  t.is(max([3, 1, -2]), 3)
  t.is(max([-3, -1, -2]), -1)
  t.is(max([Infinity, -Infinity]), Infinity)

  t.is(max([
    10,
    BigInt(5),
    12,
    BigInt(50)
  ]), BigInt(50))
})
