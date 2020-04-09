import test from 'ava'

import asyncIterableToArray from '../asyncIterableToArray.js'

test('converts async iterables to arrays', async (t) => {
  const empty = {
    async * [Symbol.asyncIterator] () {}
  }
  const several = {
    async * [Symbol.asyncIterator] () {
      yield 1
      yield 2
      yield 3
    }
  }

  t.deepEqual(await asyncIterableToArray(empty), [])
  t.deepEqual(await asyncIterableToArray(several), [1, 2, 3])
})
