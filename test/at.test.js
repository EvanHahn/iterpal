import test from 'ava'

import at from '../at'

test('returns undefined when accessing an out-of-bounds value', t => {
  t.is(at(['a', 'b', 'c'], 3), undefined)
  t.is(at(['a', 'b', 'c'], 4), undefined)
  t.is(at(['a', 'b', 'c'], 100), undefined)
  t.is(at('abc', 3), undefined)
})

test('returns the value at the nth iteration', t => {
  const everyNumberSquared = {
    * [Symbol.iterator] () {
      for (let i = 0; true; i++) {
        yield i * i
      }
    }
  }

  t.is(at('abcdef', 0), 'a')
  t.is(at('abcdef', 3), 'd')
  t.is(at(everyNumberSquared, 0), 0)
  t.is(at(everyNumberSquared, 1), 1)
  t.is(at(everyNumberSquared, 100), 100 * 100)
})

test('stops early if the iterator is done', t => {
  let nextCallCount = 0
  const firstThree = {
    [Symbol.iterator]: () => {
      return {
        next: () => {
          nextCallCount++
          if (nextCallCount > 2) {
            return { done: true }
          } else {
            return {
              value: nextCallCount,
              done: false
            }
          }
        }
      }
    }
  }

  at(firstThree, 1000)
  t.is(nextCallCount, 3)
})
