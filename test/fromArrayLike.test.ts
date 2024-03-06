import { assert, assertEquals } from "assert";

import { fromArrayLike } from "../mod.ts";

Deno.test("converts an empty array-like object to an iterable", () => {
  const result = fromArrayLike({
    length: 0,
    0: 999,
    1: 999,
    2: 999,
  });

  const iterator = result[Symbol.iterator]();

  assert(iterator.next().done);
});

Deno.test("converts an array-like object to an iterable", () => {
  const result = fromArrayLike({
    length: 3,
    0: 9,
    2: 8,
    3: 999,
  });

  const iterator = result[Symbol.iterator]();

  assertEquals(iterator.next(), { value: 9, done: false });
  assertEquals(iterator.next(), { value: undefined, done: false });
  assertEquals(iterator.next(), { value: 8, done: false });
  assert(iterator.next().done);
});
