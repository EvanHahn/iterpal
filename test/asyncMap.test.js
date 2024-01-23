import { assertEquals } from "assert";
import { assertSpyCalls, spy } from "mock";
import asyncIterableToArray from "../asyncIterableToArray.js";

import asyncMap from "../asyncMap.js";

Deno.test("returns an empty iterable when passed an empty iterable", async () => {
  const fn = spy();
  const empty = {
    async *[Symbol.asyncIterator]() {},
  };

  const result = asyncMap(empty, fn);
  const asArray = await asyncIterableToArray(result);
  assertEquals(asArray, []);

  assertSpyCalls(fn, 0);
});

Deno.test("returns a new iterator with values mapped, using a synchronous fn", async () => {
  const fn = spy((n) => n * n);
  const several = {
    async *[Symbol.asyncIterator]() {
      yield 1;
      yield 2;
      yield 3;
    },
  };

  const iterator = asyncMap(several, fn)[Symbol.asyncIterator]();

  assertSpyCalls(fn, 0);
  assertEquals(await iterator.next(), { done: false, value: 1 });
  assertSpyCalls(fn, 1);
  assertEquals(await iterator.next(), { done: false, value: 4 });
  assertSpyCalls(fn, 2);
  assertEquals(await iterator.next(), { done: false, value: 9 });
  assertSpyCalls(fn, 3);
  assertEquals(await iterator.next(), { done: true, value: undefined });
  assertEquals(await iterator.next(), { done: true, value: undefined });
  assertSpyCalls(fn, 3);
});

Deno.test("returns a new iterator with values mapped, using an asynchronous fn", async () => {
  const fn = spy((n) => Promise.resolve(n * n));
  const several = {
    async *[Symbol.asyncIterator]() {
      yield 1;
      yield 2;
      yield 3;
    },
  };

  const iterator = asyncMap(several, fn)[Symbol.asyncIterator]();

  assertSpyCalls(fn, 0);
  assertEquals(await iterator.next(), { done: false, value: 1 });
  assertSpyCalls(fn, 1);
  assertEquals(await iterator.next(), { done: false, value: 4 });
  assertSpyCalls(fn, 2);
  assertEquals(await iterator.next(), { done: false, value: 9 });
  assertSpyCalls(fn, 3);
  assertEquals(await iterator.next(), { done: true, value: undefined });
  assertEquals(await iterator.next(), { done: true, value: undefined });
  assertSpyCalls(fn, 3);
});

// TODO infinite iterable
