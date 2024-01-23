import { assertEquals } from "assert";
import asyncIterableToArray from "../asyncIterableToArray.js";

import asyncify from "../asyncify.ts";

Deno.test("converts an empty sync iterable to an async one", async () => {
  const empty = {
    *[Symbol.iterator]() {},
  };
  const emptyAsync = asyncify(empty);
  assertEquals(await asyncIterableToArray(emptyAsync), []);
});

Deno.test("converts a non-empty sync iterable to an async one", async () => {
  const result = asyncify([1, 2, 3]);
  assertEquals(await asyncIterableToArray(result), [1, 2, 3]);
});

Deno.test("converts a sync infinite iterable to an async one", async () => {
  const everyNumber = {
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) {
        yield i;
      }
    },
  };
  const iterator = asyncify(everyNumber)[Symbol.asyncIterator]();

  assertEquals(await iterator.next(), { done: false, value: 0 });
  assertEquals(await iterator.next(), { done: false, value: 1 });
  assertEquals(await iterator.next(), { done: false, value: 2 });
  assertEquals(await iterator.next(), { done: false, value: 3 });
  assertEquals(await iterator.next(), { done: false, value: 4 });
});
