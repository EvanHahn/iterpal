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
<summary><code>concat(...iterables)</code></summary>

Concatenates multiple iterables, returning a new iterable.

```js
const concat = require('iterpal/concat')

const myArray = [1, 2, 3]
const mySet = new Set([4, 5, 6])
const myMap = new Map([['bing', 'bong']])

concat(myArray, mySet, myMap)
// => Iterable yielding 1, 2, 3, 4, 5, 6, ['bing', 'bong']

[...concat(myArray, mySet, myMap)]
// => [1, 2, 3, 4, 5, 6, ['bing', 'bong']]
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
