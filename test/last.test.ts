import { assertEquals } from "assert";

import { last } from "../mod.ts";

Deno.test("returns undefined for empty iterables", async () => {
  const customEmptySync: Iterable<unknown> = {
    *[Symbol.iterator]() {},
  };
  assertEquals(last([]), undefined);
  assertEquals(last(new Set()), undefined);
  assertEquals(last(new Map()), undefined);
  assertEquals(last(customEmptySync), undefined);

  const customEmptyAsync: AsyncIterable<unknown> = {
    async *[Symbol.asyncIterator]() {},
  };
  assertEquals(await last(customEmptyAsync), undefined);
});

Deno.test("returns the last value", async () => {
  const customIterableSync = {
    *[Symbol.iterator]() {
      yield* [1, 2, 3];
    },
  };
  assertEquals(last([1]), 1);
  assertEquals(last("🌎🌍🌍"), "🌍");
  assertEquals(last(new Set([1, 2, 3])), 3);
  assertEquals(last(customIterableSync), 3);

  const customIterableAsync = {
    async *[Symbol.asyncIterator]() {
      yield* [1, 2, 3];
    },
  };
  assertEquals(await last(customIterableAsync), 3);
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
  assertEquals(last(hybrid), 3);
});
