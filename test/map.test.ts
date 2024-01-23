import { assert, assertEquals } from "assert";
import { assertSpyCalls, spy } from "mock";

import map from "../map.ts";

Deno.test("returns an empty iterable when passed an empty iterable", () => {
  const fn = spy();

  assertEquals([...map([], fn)], []);
  assertEquals([...map(new Set(), fn)], []);
  assertEquals([...map(new Map(), fn)], []);

  assertSpyCalls(fn, 0);
});

Deno.test("returns a new iterator with values mapped", () => {
  const fn = spy((n: number) => n * n);
  const result = map([1, 2, 3], fn);

  assertSpyCalls(fn, 0);

  assertEquals([...result], [1, 4, 9]);
  assert(!(result instanceof Array));

  assertSpyCalls(fn, 3);
});

Deno.test('iterating doesn\'t "spend" the iterable', () => {
  const result = map([1, 2, 3], (n) => n * n);

  assertEquals([...result], [1, 4, 9]);
  assertEquals([...result], [1, 4, 9]);
  assertEquals([...result], [1, 4, 9]);
});

Deno.test("can map over an infinite iterable", () => {
  const everyNumber = {
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) {
        yield i;
      }
    },
  };

  const result = map(everyNumber, (n) => n * n);
  const iterator = result[Symbol.iterator]();

  assertEquals(iterator.next(), { value: 0, done: false });
  assertEquals(iterator.next(), { value: 1, done: false });
  assertEquals(iterator.next(), { value: 4, done: false });
  assertEquals(iterator.next(), { value: 9, done: false });
});
