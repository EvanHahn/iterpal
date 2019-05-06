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

:warning: This library is [licensed with GPL3](https://github.com/EvanHahn/iterpal/blob/master/LICENSE.txt), so you can't use it with closed-source projects.

## API docs

<details>
<summary><code>at</code></summary>

Get the nth element from an iterable. Returns `undefined` if the index is out of range.

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
