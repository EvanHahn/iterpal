import test from 'ava'

import zip from '../zip'

test('zips multiple iterables, stopping when the first is exhausted', t => {
  const everyNumber = {
    [Symbol.iterator]: function * () {
      for (let i = 0; true; i++) {
        yield i
      }
    }
  }
  const smallSet = new Set(['foo', 'bar', 'baz'])
  const arr = [99, 98, 97, 96]

  t.deepEqual([...zip([smallSet, everyNumber], t)], [
    ['foo', 0],
    ['bar', 1],
    ['baz', 2]
  ])
  t.deepEqual([...zip([smallSet, everyNumber, arr], t)], [
    ['foo', 0, 99],
    ['bar', 1, 98],
    ['baz', 2, 97]
  ])

  t.deepEqual([...zip([arr, smallSet])], [
    [99, 'foo'],
    [98, 'bar'],
    [97, 'baz'],
    [96, undefined]
  ])

  const infiniteZipper = zip([everyNumber, arr])[Symbol.iterator]()
  t.deepEqual(infiniteZipper.next(), {
    done: false,
    value: [0, 99]
  })
  t.deepEqual(infiniteZipper.next(), {
    done: false,
    value: [1, 98]
  })
  t.deepEqual(infiniteZipper.next(), {
    done: false,
    value: [2, 97]
  })
  t.deepEqual(infiniteZipper.next(), {
    done: false,
    value: [3, 96]
  })
  t.deepEqual(infiniteZipper.next(), {
    done: false,
    value: [4, undefined]
  })
  t.deepEqual(infiniteZipper.next(), {
    done: false,
    value: [5, undefined]
  })
})
