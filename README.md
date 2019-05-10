# [![Iterpal](media/iterpal_logo.png)](https://github.com/EvanHahn/iterpal)

Iterpal is a friendly collection of utilities for iterables in JavaScript. Iterpal can help whether you're dealing with an array, a string, a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), a [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), a [Buffer](https://nodejs.org/api/buffer.html#buffer_buffer), or [any other iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol). It can also turn objects into iterables.

Here's a quick sample:

```js
const map = require('iterpal/map')
const filter = require('iterpal/filter')

function squareEvens (iterable) {
  let result = iterable
  result = filter(result, n => (n % 2) === 0)
  result = map(result, n => n * n)
  return result
}

const myNumbers = [1, 2, 3, 4, 5, 6]
const myNumbersAsSet = new Set(myNumbers)

console.log([...squareEvens(myNumbers)])
// => [4, 16, 36]

console.log([...squareEvens(myNumbersAsSet)])
// => [4, 16, 36]
```

:warning: This library is [licensed with GPL3](https://github.com/EvanHahn/iterpal/blob/master/LICENSE.txt), so keep that in mind.

:warning: This library is experimental!

## Why Iterpal?

Iterpal offers a few benefits:

1. Iterpal lets you **use collection functions with non-arrays like Sets and Maps**. For example, `map` and `filter` and `reduce` are super useful, but `Set`s don't have them built in.

1. Iterpal is often more **performant** than using native methods, depending on what you're doing. Because JavaScript iterables are lazily evaluated, memory usage can go way down for large collections. And if you don't need to "calculate" an entire collection, the time to completion can drop dramatically. Check out the `benchmarks/` folder to see some samples for yourself.

1. Iterpal lets you deal with **huge collections** with ease. For example, you can't express an array of every positive integer—you'd run out of memory. Iterpal's `range()` function returns a lazily-evaluated iterable that yields every positive integer.

## Recipes

<details>
<summary>Map over a Map</summary>

```js
const map = require('iterpal/map')

const ages = new Map([
  ['Esmeralda', 30],
  ['Carlo', 45],
  ['Ignacio', 99]
])

const agesNextYear = new Map(map(ages, ([name, age]) => (
  [name, age + 1]
)))

ages.get('Esmeralda')
// => 30

agesNextYear.get('Esmeralda')
// => 31
```
</details>

<details>
<summary>Invert a Map</summary>

```js
const zip = require('iterpal/zip')
const map = require('iterpal/map')

function invertMap (toInvert) {
  return new Map(zip([toInvert.values(), toInvert.keys()]))
}

const nameById = new Map([
  [123, 'Burt'],
  [456, 'Ernie'],
  [456, 'Big Bird']
])
const idByName = invertMap(nameById)

idByName.get('Ernie')
// => 456
```
</details>

## API docs

<details>
<summary><code>at(iterable, index)</code></summary>

Returns the nth element from an iterable. Returns `undefined` if the index is out of range.

```js
const at = require('iterpal/at')

at(new Set(['hello', 'world']), 0)
// => 'hello'

at(['hello', 'world'], 1)
// => 'world'

at(new Set(['hello', 'world']), 2)
// => undefined
```
</details>

<details>
<summary><code>concat(iterables)</code></summary>

Concatenates multiple iterables, returning a new iterable.

```js
const concat = require('iterpal/concat')

const myArray = [1, 2, 3]
const mySet = new Set([4, 5, 6])
const myMap = new Map([
  ['bing', 'bong'],
  ['foo', 'boo']
])

concat([myArray, mySet, myMap])
// => Iterable yielding 1, 2, 3, 4, 5, 6, ['bing', 'bong'], ['foo', 'boo']

concat(myMap)
// => Iterable yielding 'bing', 'bong', 'foo', 'boo'

[...concat([myArray, mySet, myMap])]
// => [1, 2, 3, 4, 5, 6, ['bing', 'bong'], ['foo', 'boo']]
```
</details>

<details>
<summary><code>drop(iterable, amount)</code></summary>

Returns an iterable with the first `amount` elements removed.

```js
const drop = require('iterpal/drop')

at(new Set(['hello', 'to', 'the' 'world!']), 2)
// => Iterable yielding 'the', 'world'

at(new Set(['hello', 'to', 'the' 'world!']), 4)
// => Empty iterable
```
</details>

<details>
<summary><code>every(iterable, predicate)</code></summary>

Returns `true` if `predicate(value)` returns true for every value in `iterable`, and false otherwise. Returns `true` for an empty iterable.

```js
const every = require('iterpal/every')

function isEven(n) {
  return (n % 2) === 0
}

const mySet = new Set([2, 4, 6, 8])
every(mySet, isEven)
// => true

every([2, 3, 4], isEven)
// => false

every([], () => false)
// => true
```
</details>

<details>
<summary><code>filter(iterable, predicate)</code></summary>

Returns a new iterable which iterates over `iterable`, yielding when `predicate(value)` returns a truthy value.

The predicate function is invoked with one argument: the current value.

```js
const filter = require('iterpal/filter')

function isEven(n) {
  return (n % 2) === 0
}

const mySet = new Set([1, 2, 3, 4, 5, 6])

filter(mySet, isEven)
// => Iterable yielding 2, 4, 6

[...filter(mySet, isEven)]
// => [2, 4, 6]
```
</details>

<details>
<summary><code>find(iterable, predicate)</code></summary>

Iterates over `iterable`, returning the first element `predicate(value)` returns truthy for. Returns `undefined` if no value is found.

```js
const find = require('iterpal/find')

function isEven(n) {
  return (n % 2) === 0
}

find(new Set([1, 3, 4, 5]), isEven)
// => 4

find([1, 3, 5, 7], isEven)
// => undefined

find([], isEven)
// => undefined
```
</details>

<details>
<summary><code>first(iterable)</code></summary>

Returns the first value in an iterable. Returns `undefined` if the iterable is empty.

```js
const first = require('iterpal/first')

first(new Set(['hello', 'world']))
// => 'hello'

first([10, 11, 12])
// => 10

first(new Map())
// => undefined
```
</details>

<details>
<summary><code>join(iterable, separator=',')</code></summary>

Converts all elements in `iterable` into a string separated by `separator`.

Like `Array.prototype.join`, `null` and `undefined` are converted to empty strings.

```js
const join = require('iterpal/join')

join(new Set(['hello', 'world']))
// => 'hello,world'

join(new Set(['hello', 'world']), ' and ')
// => 'hello and world'

join([1, undefined, 2, null, 3])
// => '1,,2,,3'

join(new Map())
// => ''
```
</details>

<details>
<summary><code>map(iterable, fn)</code></summary>

Returns a new iterable which iterates over `iterable`, yielding `fn(value)` for each value.

`fn` is invoked with one argument: the current value.

```js
const map = require('iterpal/map')

function square(n) {
  return n * n
}

const mySet = new Set([1, 2, 3])

map(mySet, square)
// => Iterable yielding 1, 4, 9

[...map(mySet, square)]
// => [1, 4, 9]
```
</details>

<details>
<summary><code>objectEntries(obj)</code></summary>

Returns an iterable, yielding `[key, value]` for each entry in the object. An iterable version of `Object.entries`.

```js
const objectEntries = require('iterpal/objectEntries')

objectEntries({
  bing: 'bong',
  foo: 'boo'
})
// => Iterable yielding ['bing', 'bong'], ['foo', 'boo']

objectEntries({})
// => Empty iterable
```
</details>

<details>
<summary><code>objectHas(obj, property)</code></summary>

An internal utility method exposed for public use. Returns true if `property` is an own-property of `obj`, false otherwise. You can use this instead of `Object.prototype.hasOwnProperty`.

```js
const objectHas = require('iterpal/objectHas')

objectHas({ foo: 'bar' }, 'foo')
// => true

objectHas({ foo: 'bar' }, 'baz')
// => false

objectHas({ foo: 'bar' }, 'hasOwnProperty')
// => false
```
</details>

<details>
<summary><code>objectKeys(obj)</code></summary>

Returns an iterable, yielding each key in the object. An iterable version of `Object.keys`.

```js
const objectKeys = require('iterpal/objectKeys')

objectKeys({
  bing: 1,
  bong: 2
})
// => Iterable yielding 'bing', 'bong'

objectKeys({})
// => Empty iterable
```
</details>

<details>
<summary><code>objectValues(obj)</code></summary>

Returns an iterable, yielding each value in the object. An iterable version of `Object.values`.

```js
const objectValues = require('iterpal/objectValues')

objectValues({
  bing: 1,
  bong: 2
})
// => Iterable yielding 1, 2

objectValues({})
// => Empty iterable
```
</details>

<details>
<summary><code>range(start = 0, finish = Infinity)</code></summary>

Returns an iterable of integers from `start` to `finish`.

```js
const range = require('iterpal/range')

range()
// => Iterable yielding 0, 1, 2, 3, 4, 5...

range(10)
// => Iterable yielding 10, 11, 12, 13, 14, 15...

range(6, 9)
// => Iterable yielding 6, 7, 8

[...range(6, 9)]
// => [6, 7, 8]
```
</details>

<details>
<summary><code>reduce(iterable, fn, accumulator)</code></summary>

Reduces `iterable` to a single value. On each iteration, calls `fn` with the result so far (starting at `accumulator`) and the current value.

```js
const reduce = require('iterpal/reduce')

function add (a, b) {
  return a + b
}

reduce(new Set([1, 2, 3]), add, 0)
// => 6

reduce(new Set([1, 2, 3]), add, 10)
// => 16

reduce([], add, 123)
// => 123
```
</details>

<details>
<summary><code>repeat(value, times = Infinity)</code></summary>

Returns an iterable that yields `value`. If `times` is supplied, the length is boundless. If `times` is not supplied, the iterable is infinite.

```js
const repeat = require('iterpal/repeat')

repeat('foo')
// => Iterable yielding 'foo', 'foo', 'foo', 'foo'...

repeat('hi', 5)
// => Iterable yielding 'hi', 'hi', 'hi', 'hi', 'hi'

[...repeat('hi', 5)]
// => ['hi', 'hi', 'hi', 'hi', 'hi']
```
</details>

<details>
<summary><code>some(iterable, predicate)</code></summary>

Returns `true` if `predicate(value)` returns true for any value in `iterable`, and false otherwise. Returns `false` for an empty iterable.

```js
const some = require('iterpal/some')

function isEven(n) {
  return (n % 2) === 0
}

const mySet = new Set([1, 2, 3])
some(mySet, isEven)
// => true

some([1, 3, 5], isEven)
// => false

some([], () => true)
// => false
```
</details>

<details>
<summary><code>take(iterable, amount)</code></summary>

Returns a new iterable with `amount` elements taken from the beginning.

```js
const take = require('iterpal/take')

take(['hello', 'to', 'you!'], 2)
// => Iterable yielding 'hello', 'to'

take(['hello', 'to', 'you!'], 200)
// => Iterable yielding 'hello', 'to', 'you!'
```
</details>

<details>
<summary><code>zip(iterables)</code></summary>

Returns an iterable of arrays. The first array contains the first elements of each of the input iterables, the second contains the second elements of each input iterable, and so on. Useful when constructing `Map`s.

```js
const zip = require('iterpal/zip')
const range = require('iterpal/range')

const everyPositiveInteger = range(1)
const smallSet = new Set(['hello', 'world'])
const primes = [2, 3, 5, 7, 11]

zip([smallSet, everyPositiveInteger])
// => Iterable yielding ['hello', 1], ['world', 2]

new Map(zip([smallSet, everyPositiveInteger]))
// => Map { 'hello' => 1, 'world' => 2 }

zip([smallSet, primes, everyPositiveInteger])
// => Iterable yielding ['hello', 2, 1], ['world', 3, 2]

zip([everyPositiveInteger, smallSet])
// => Infinite iterable yielding [1, 'hello'], [2, 'world'], [3, undefined], [4, undefined], ...
```
</details>
