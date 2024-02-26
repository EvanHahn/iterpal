import { assertEquals } from "assert";

import { arrayFrom, emptyAsyncIterable } from "../mod.ts";

Deno.test("converts sync iterables to arrays", () => {
  assertEquals(arrayFrom(new Set()), []);
  assertEquals(arrayFrom(new Set([1, 2, 3])), [1, 2, 3]);
});

Deno.test("converts async iterables to arrays", async () => {
  const several = {
    async *[Symbol.asyncIterator]() {
      yield 1;
      yield 2;
      yield 3;
    },
  };

  assertEquals(await arrayFrom(emptyAsyncIterable), []);
  assertEquals(await arrayFrom(several), [1, 2, 3]);
});

Deno.test("prefers sync iterables", () => {
  const hybrid: Iterable<number> & AsyncIterable<number> = {
    *[Symbol.iterator]() {
      yield* [1, 2, 3];
    },
    async *[Symbol.asyncIterator]() {
      yield* [4, 5, 6];
    },
  };
  assertEquals(arrayFrom(hybrid), [1, 2, 3]);
});
