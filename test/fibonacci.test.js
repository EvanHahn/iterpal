import test from 'ava'
import take from '../take'

import fibonacci from '../fibonacci'

test('yields the Fibonacci sequence', t => {
  const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
  const actual = [...take(fibonacci(), 12)]
  t.deepEqual(actual, expected)
})
