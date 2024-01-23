import { assertEquals } from "assert";

import asyncIterableToArray from "../asyncIterableToArray.js";

Deno.test("converts async iterables to arrays", async () => {
  const empty = {
    async *[Symbol.asyncIterator]() {},
  };
  const several = {
    async *[Symbol.asyncIterator]() {
      yield 1;
      yield 2;
      yield 3;
    },
  };

  assertEquals(await asyncIterableToArray(empty), []);
  assertEquals(await asyncIterableToArray(several), [1, 2, 3]);
});
