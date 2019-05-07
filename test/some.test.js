import test from 'ava'

import some from '../some'

test('returns false for empty iterables', t => {
  const alwaysTrue = () => true

  t.false(some([], alwaysTrue))
  t.false(some(new Map(), alwaysTrue))
})

test('returns true if any of the elements return true, stopping after something is found', t => {
  const everyNumber = {
    [Symbol.iterator]: function * () {
      for (let i = 0; true; i++) {
        yield i
      }
    }
  }

  const isThree = n => n === 3

  t.true(some([1, 2, 3, 4], isThree))
  t.true(some(new Set([1, 2, 3, 4]), isThree))
  t.true(some(everyNumber, isThree))
})

test('returns false if none of the elements return true', t => {
  const isThree = n => n === 3

  t.false(some([1, 2, 4], isThree))
  t.false(some(new Set([1, 2, 4]), isThree))
})
