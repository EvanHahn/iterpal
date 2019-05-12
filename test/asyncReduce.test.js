import test from 'ava'
import sinon from 'sinon'

import asyncReduce from '../asyncReduce'

test('returns the accumulator if the iterable is empty', async (t) => {
  const fn = sinon.fake()
  const empty = {
    async * [Symbol.asyncIterator] () {}
  }

  t.deepEqual(await asyncReduce(empty, fn, 123), 123)

  sinon.assert.notCalled(fn)
})

test('reduces an async iterator to a single value using a synchronous function', async (t) => {
  const several = {
    async * [Symbol.asyncIterator] () {
      yield 1
      yield 2
      yield 3
    }
  }
  const fn = (a, b) => a + b

  t.deepEqual(await asyncReduce(several, fn, 10), 16)
})

test('reduces an async iterator to a single value using an synchronous function', async (t) => {
  const several = {
    async * [Symbol.asyncIterator] () {
      yield 1
      yield 2
      yield 3
    }
  }
  const fn = (a, b) => Promise.resolve(a + b)

  t.deepEqual(await asyncReduce(several, fn, 10), 16)
})
