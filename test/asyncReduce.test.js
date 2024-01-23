import { assertEquals } from "assert";
import { assertSpyCalls, spy } from "mock";

import asyncReduce from "../asyncReduce.js";

Deno.test("returns the accumulator if the iterable is empty", async () => {
  const fn = spy();
  const empty = {
    async *[Symbol.asyncIterator]() {},
  };

  assertEquals(await asyncReduce(empty, fn, 123), 123);

  assertSpyCalls(fn, 0);
});

Deno.test("reduces an async iterator to a single value using a synchronous function", async () => {
  const several = {
    async *[Symbol.asyncIterator]() {
      yield 1;
      yield 2;
      yield 3;
    },
  };
  const fn = (a, b) => a + b;

  assertEquals(await asyncReduce(several, fn, 10), 16);
});

Deno.test("reduces an async iterator to a single value using an synchronous function", async () => {
  const several = {
    async *[Symbol.asyncIterator]() {
      yield 1;
      yield 2;
      yield 3;
    },
  };
  const fn = (a, b) => Promise.resolve(a + b);

  assertEquals(await asyncReduce(several, fn, 10), 16);
});
