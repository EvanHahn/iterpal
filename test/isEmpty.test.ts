import { assert, assertFalse } from "assert";

import { asyncify, emptyAsyncIterable, isEmpty } from "../mod.ts";

Deno.test("returns true for empty iterables", async () => {
  const customEmpty = {
    *[Symbol.iterator]() {},
  };

  assert(isEmpty([]));
  assert(isEmpty(new Set()));
  assert(isEmpty(new Map()));
  assert(isEmpty(customEmpty));

  assert(await isEmpty(emptyAsyncIterable));
});

Deno.test("returns false for non-empty iterables", async () => {
  const everyNumberSync = {
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) {
        yield i;
      }
    },
  };
  assertFalse(isEmpty([1]));
  assertFalse(isEmpty(new Set([1])));
  assertFalse(isEmpty(new Map([["hi", 5]])));
  assertFalse(isEmpty(everyNumberSync));

  assertFalse(await isEmpty(asyncify([1])));
  assertFalse(await isEmpty(asyncify(everyNumberSync)));
});

Deno.test("prefers sync iterables", () => {
  const hybrid: Iterable<unknown> & AsyncIterable<unknown> = {
    *[Symbol.iterator]() {},
    async *[Symbol.asyncIterator]() {
      yield* [1, 2, 3];
    },
  };
  assert(isEmpty(hybrid));
});
