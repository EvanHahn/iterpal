# Iterpal

Iterable tools for JavaScript.

## Installation

Iterpal is available from the npm registry:

```sh
npm install iterpal
```

With Deno:

```typescript
import { filter, map } from "https://evanhahn.com/tape/iterpal/0.3.0/mod.ts";
```

## Documentation

[API documentation](https://doc.deno.land/https://evanhahn.com/tape/iterpal/0.3.0/mod.ts)

## Use cases

- Get helpful utilities not in the standard library.

  `last` is a simple one, but there are many others:

  ```javascript
  import { last } from "iterpal";
  last("iterpal!");
  // => "!"
  ```

- Use collection utilities like `map` and `filter` with any iterable.

  That includes arrays, strings,
  [sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set),
  [maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map),
  [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray),
  [buffers](https://nodejs.org/api/buffer.html#buffer_buffer),
  [streams](https://nodejs.org/api/stream.html), (async)
  [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator),
  or
  [anything implementing the interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol).

  ```javascript
  import { filter } from "iterpal";
  const letterOs = filter("foo", (c) => c === "o");
  ```

- Take advantage of lazy iteration.

  Many of Iterpal's functions return lazily, which can help you maintain a
  functional style while still enjoying performance benefits.

  ```javascript
  import { map, take } from "iterpal";

  // The second operation is faster because
  // it iterates over fewer values.
  lotsOfNumbers.map(square).slice(10);
  lotsOfNumbers.slice(10).map(square);

  // These two operations are basically equivalent.
  take(map(lotsOfNumbers, square), 10);
  map(take(lotsOfNumbers, 10), square);
  ```
