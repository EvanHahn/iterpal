import test from 'ava'

import range from '../range'

test('returns an infinite range of integers by default', t => {
  const iterator = range()[Symbol.iterator]()

  for (let i = 0; i < 100; i++) {
    t.deepEqual(iterator.next(), { value: i, done: false })
  }
})

test('returns a range starting at "start" if one argument is passed', t => {
  const startingAt0 = range(0)[Symbol.iterator]()
  for (let i = 0; i < 100; i++) {
    t.deepEqual(startingAt0.next(), { value: i, done: false })
  }

  const startingAt10 = range(10)[Symbol.iterator]()
  for (let i = 10; i < 100; i++) {
    t.deepEqual(startingAt10.next(), { value: i, done: false })
  }

  const startingAtFraction = range(1.5)[Symbol.iterator]()
  for (let i = 1.5; i < 100; i++) {
    t.deepEqual(startingAtFraction.next(), { value: i, done: false })
  }

  const bigIntStart = range(BigInt(5))[Symbol.iterator]()
  for (let i = BigInt(5); i < BigInt(100); i++) {
    t.deepEqual(bigIntStart.next(), { value: i, done: false })
  }
})

test('returns a range starting at "start" and stopping at "end" if two arguments are passed', t => {
  t.deepEqual([...range(0, 0)], [])
  t.deepEqual([...range(1, 1)], [])
  t.deepEqual([...range(100, 100)], [])

  t.deepEqual([...range(0, 1)], [0])
  t.deepEqual([...range(0, 2)], [0, 1])
  t.deepEqual([...range(5, 10)], [5, 6, 7, 8, 9])

  t.deepEqual([...range(1.5, 6.5)], [1.5, 2.5, 3.5, 4.5, 5.5])
  t.deepEqual([...range(1.5, 6.1)], [1.5, 2.5, 3.5, 4.5, 5.5])
  t.deepEqual([...range(1.5, 6.6)], [1.5, 2.5, 3.5, 4.5, 5.5, 6.5])

  t.deepEqual([...range(5, 4)], [])

  t.deepEqual(
    [...range(BigInt(5), BigInt(8))],
    [5, 6, 7].map(BigInt)
  )
})
