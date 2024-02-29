import { assertEquals, assertRejects } from "assert";

import { arrayFrom, asyncify, drop } from "../mod.ts";

Deno.test("drops the first n elements from an iterable", async () => {
  assertEquals([...drop([1, 2, 3], 0)], [1, 2, 3]);
  assertEquals([...drop([1, 2, 3], 1)], [2, 3]);
  assertEquals([...drop([1, 2, 3], 2)], [3]);

  const async123 = asyncify([1, 2, 3]);
  assertEquals(await arrayFrom(drop(async123, 0)), [1, 2, 3]);
  assertEquals(await arrayFrom(drop(async123, 1)), [2, 3]);
  assertEquals(await arrayFrom(drop(async123, 2)), [3]);
});

Deno.test("can drop all elements from an iterable, returning an empty iterable", async () => {
  const set = new Set([1, 2, 3]);
  assertEquals([...drop(set, 3)], []);
  assertEquals([...drop(set, 4)], []);
  assertEquals([...drop(set, 10000)], []);

  const async123 = asyncify([1, 2, 3]);
  assertEquals(await arrayFrom(drop(async123, 3)), []);
  assertEquals(await arrayFrom(drop(async123, 4)), []);
  assertEquals(await arrayFrom(drop(async123, 10000)), []);
});

Deno.test("if an async iterator's promise rejects, throws before reaching the desired value", () => {
  const iterable: AsyncIterable<unknown> = {
    async *[Symbol.asyncIterator]() {
      yield* [1, 2];
      throw new Error("test error");
    },
  };

  const iterator = drop(iterable, 3)[Symbol.asyncIterator]();

  assertRejects(() => iterator.next());
});

Deno.test("multiple calls to next() on a slow async iterator", async () => {
  const { promise: beforeFirstTwoPromise, resolve: unblock } = Promise
    .withResolvers<void>();

  const iterable: AsyncIterable<unknown> = {
    async *[Symbol.asyncIterator]() {
      await beforeFirstTwoPromise;
      yield* ["dropped 1", "dropped 2", "first", "second"];
    },
  };

  const iterator = drop(iterable, 2)[Symbol.asyncIterator]();

  let firstResult: unknown;
  let secondResult: unknown;
  iterator.next().then(({ value }) => {
    firstResult = value;
  });
  const secondPromise = iterator.next().then(({ value }) => {
    secondResult = value;
  });

  assertEquals(firstResult, undefined);
  assertEquals(secondResult, undefined);

  unblock();

  await secondPromise;

  assertEquals(firstResult, "first");
  assertEquals(secondResult, "second");
});
