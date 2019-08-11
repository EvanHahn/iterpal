import test from 'ava'

import isEmpty from '../isEmpty'

test('returns true for empty iterables', t => {
  const customEmpty = {
    * [Symbol.iterator] () {}
  }

  t.true(isEmpty([]))
  t.true(isEmpty(new Set()))
  t.true(isEmpty(new Map()))
  t.true(isEmpty(customEmpty))
})

test('returns false for non-empty iterables', t => {
  const everyNumber = {
    * [Symbol.iterator] () {
      for (let i = 0; true; i++) {
        yield i
      }
    }
  }

  t.false(isEmpty([1]))
  t.false(isEmpty(new Set([1])))
  t.false(isEmpty(new Map([['hi', 5]])))
  t.false(isEmpty(everyNumber))
})
