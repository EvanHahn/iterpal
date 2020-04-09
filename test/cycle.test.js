import test from 'ava'

import cycle from '../cycle.js'
import take from '../take.js'

test('throws when calling iterating if the iterable is empty', t => {
  const customEmpty = {
    * [Symbol.iterator] () {}
  }

  for (const iterable of [[], new Set(), customEmpty]) {
    const iterator = cycle(iterable)[Symbol.iterator]()
    t.throws(() => {
      iterator.next()
    })
  }
})

test('repeats a one-element iterable', t => {
  const justOne = {
    * [Symbol.iterator] () { yield 'hi' }
  }

  t.deepEqual([...take(cycle([1]), 5)], [1, 1, 1, 1, 1])
  t.deepEqual([...take(cycle(justOne), 5)], ['hi', 'hi', 'hi', 'hi', 'hi'])
})

test('repeats iterables', t => {
  const abc = {
    * [Symbol.iterator] () {
      yield 'a'
      yield 'b'
      yield 'c'
    }
  }

  t.deepEqual([...take(cycle([1, 2, 3]), 7)], [1, 2, 3, 1, 2, 3, 1])
  t.deepEqual([...take(cycle(abc), 5)], ['a', 'b', 'c', 'a', 'b'])
})

test('effectively does nothing to infinite iterables', t => {
  const infinite = {
    * [Symbol.iterator] () {
      for (let i = 5; true; i++) {
        yield i
      }
    }
  }

  t.deepEqual([...take(cycle(infinite), 7)], [5, 6, 7, 8, 9, 10, 11])
})
