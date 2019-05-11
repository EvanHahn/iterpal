import test from 'ava'

import asyncIterableToArray from '../asyncIterableToArray'

test('converts async iterables to arrays', async (t) => {
  const empty = {
    [Symbol.asyncIterator]: async function * () {}
  }
  const several = {
    [Symbol.asyncIterator]: async function * () {
      yield 1
      yield 2
      yield 3
    }
  }

  t.deepEqual(await asyncIterableToArray(empty), [])
  t.deepEqual(await asyncIterableToArray(several), [1, 2, 3])
})
