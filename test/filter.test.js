import test from 'ava'
import sinon from 'sinon'

import filter from '../filter'

test('does nothing to empty iterables', t => {
  const fn = sinon.fake()

  t.deepEqual([...filter([], fn)], [])
  t.deepEqual([...filter(new Set(), fn)], [])
  t.deepEqual([...filter(new Map(), fn)], [])

  sinon.assert.notCalled(fn)
})

test('returns a new iterator with values filtered', t => {
  const fn = sinon.fake(n => Boolean(n % 2))
  const result = filter([1, 2, 3, 4, 5], fn)

  sinon.assert.notCalled(fn)

  t.deepEqual([...result], [1, 3, 5])
  t.assert(!(result instanceof Array))

  sinon.assert.callCount(fn, 5)
})

test('can filter an infinite iterable', t => {
  const everyNumber = {
    * [Symbol.iterator] () {
      for (let i = 1; true; i++) {
        yield i
      }
    }
  }

  const fn = sinon.fake(n => Boolean(n % 2))
  const result = filter(everyNumber, fn)
  const iterator = result[Symbol.iterator]()

  t.deepEqual(iterator.next(), { value: 1, done: false })
  t.deepEqual(iterator.next(), { value: 3, done: false })
  t.deepEqual(iterator.next(), { value: 5, done: false })
  t.deepEqual(iterator.next(), { value: 7, done: false })
})
