import test from 'ava'
import sinon from 'sinon'

import map from '../map'

test('does nothing to empty iterables', t => {
  const fn = sinon.fake()

  t.deepEqual([...map([], fn)], [])
  t.deepEqual([...map(new Set(), fn)], [])
  t.deepEqual([...map(new Map(), fn)], [])

  sinon.assert.notCalled(fn)
})

test('returns a new iterator with values mapped', t => {
  const fn = sinon.fake(n => n * n)
  const result = map([1, 2, 3], fn)

  sinon.assert.notCalled(fn)

  t.deepEqual([...result], [1, 4, 9])
  t.assert(!(result instanceof Array))

  sinon.assert.calledThrice(fn)
})

test('can map over an infinite iterable', t => {
  const everyNumber = {
    [Symbol.iterator]: function * () {
      for (let i = 0; true; i++) {
        yield i
      }
    }
  }

  const fn = sinon.fake(n => n * n)
  const result = map(everyNumber, fn)
  const iterator = result[Symbol.iterator]()

  t.deepEqual(iterator.next(), { value: 0, done: false })
  t.deepEqual(iterator.next(), { value: 1, done: false })
  t.deepEqual(iterator.next(), { value: 4, done: false })
  t.deepEqual(iterator.next(), { value: 9, done: false })
})
