import { assertEquals } from "assert";

import { emptyAsyncIterable, setFrom } from "../mod.ts";

Deno.test("converts sync iterables to sets", () => {
  assertEquals(setFrom([]), new Set());
  assertEquals(setFrom([1, 2, 3, 1]), new Set([1, 2, 3]));
});

Deno.test("converts async iterables to sets", async () => {
  const several = {
    async *[Symbol.asyncIterator]() {
      yield* [1, 2, 3, 1];
    },
  };

  assertEquals(await setFrom(emptyAsyncIterable), new Set());
  assertEquals(await setFrom(several), new Set([1, 2, 3]));
});

Deno.test("prefers sync iterables", () => {
  const hybrid: Iterable<number> & AsyncIterable<number> = {
    *[Symbol.iterator]() {
      yield* [1, 2, 3, 1];
    },
    async *[Symbol.asyncIterator]() {
      yield* [9, 9, 9];
    },
  };
  assertEquals(setFrom(hybrid), new Set([1, 2, 3]));
});
