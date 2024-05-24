import { assertEquals } from "assert";

import { arrayFrom, asyncify, emptyAsyncIterable, rest, take } from "../mod.ts";

Deno.test(
  "returns an empty iterable when passed an empty iterable",
  async () => {
    assertEquals(arrayFrom(rest([])), []);
    assertEquals(arrayFrom(rest(new Set())), []);

    assertEquals(await arrayFrom(rest(emptyAsyncIterable)), []);
  },
);

Deno.test(
  "returns an empty iterable when passed one-element iterables",
  async () => {
    assertEquals(arrayFrom(rest([1])), []);
    assertEquals(arrayFrom(rest(new Set([1]))), []);

    assertEquals(await arrayFrom(rest(asyncify([1]))), []);
  },
);

Deno.test("returns an iterable without the first element", async () => {
  function* numbers() {
    for (let i = 1;; i++) yield i;
  }
  assertEquals(arrayFrom(rest([1, 2, 3])), [2, 3]);
  assertEquals(arrayFrom(take(rest(numbers()), 4)), [2, 3, 4, 5]);

  assertEquals(await arrayFrom(rest(asyncify([1, 2, 3]))), [2, 3]);
});
