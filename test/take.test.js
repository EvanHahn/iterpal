import test from 'ava'

import take from '../take.js'

test('returns the first n elements from an iterable', t => {
  const everyNumber = {
    * [Symbol.iterator] () {
      for (let i = 0; true; i++) {
        yield i
      }
    }
  }

  t.deepEqual([...take(everyNumber, 0)], [])
  t.deepEqual([...take(everyNumber, 1)], [0])
  t.deepEqual([...take(everyNumber, 7)], [0, 1, 2, 3, 4, 5, 6])
})

test('stops after the iterable has been exhausted', t => {
  const set = new Set([1, 2, 3])

  t.deepEqual([...take(set, 3)], [1, 2, 3])
  t.deepEqual([...take(set, 4)], [1, 2, 3])
  t.deepEqual([...take(set, 10000)], [1, 2, 3])
})
