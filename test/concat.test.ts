import { assertEquals, assertNotStrictEquals } from "assert";
import { assertSpyCalls, spy } from "mock";

import {
  asyncify,
  asyncIterableToArray,
  concat,
  emptyAsyncIterable,
} from "../mod.ts";

Deno.test(
  "doesn't return the same iterable even when passed 1 iterable",
  () => {
    const arr = [1, 2, 3];
    assertNotStrictEquals(concat(arr), arr);

    const asyncIterable = asyncify([1, 2, 3]);
    assertNotStrictEquals(concat(asyncIterable), asyncIterable);
  },
);

Deno.test("handling empty iterables", async () => {
  const customEmptySync = {
    *[Symbol.iterator]() {},
  };
  assertEquals([...concat([], [])], []);
  assertEquals([...concat(new Set<never>(), [])], []);
  assertEquals([...concat([], customEmptySync)], []);
  assertEquals([...concat([], customEmptySync, new Set(), new Map())], []);

  assertEquals(
    await asyncIterableToArray(concat(emptyAsyncIterable, emptyAsyncIterable)),
    [],
  );
  assertEquals(await asyncIterableToArray(concat(emptyAsyncIterable, [])), []);
  assertEquals(await asyncIterableToArray(concat([], emptyAsyncIterable)), []);
});

Deno.test("concatenates multiple iterables", async () => {
  const everyNumberSync = {
    *[Symbol.iterator]() {
      for (let i = 4; true; i++) {
        yield i;
      }
    },
  };
  const resultSync = concat([1, 2], new Set([3]), everyNumberSync);
  const iteratorSync = resultSync[Symbol.iterator]();
  assertEquals(iteratorSync.next(), { value: 1, done: false });
  assertEquals(iteratorSync.next(), { value: 2, done: false });
  assertEquals(iteratorSync.next(), { value: 3, done: false });
  assertEquals(iteratorSync.next(), { value: 4, done: false });
  assertEquals(iteratorSync.next(), { value: 5, done: false });
  assertEquals(iteratorSync.next(), { value: 6, done: false });
  assertEquals(iteratorSync.next(), { value: 7, done: false });

  const everyNumberAsync = asyncify(everyNumberSync);
  const resultAsync = concat([1, 2], new Set([3]), everyNumberAsync);
  const iteratorAsync = resultAsync[Symbol.asyncIterator]();
  assertEquals(await iteratorAsync.next(), { value: 1, done: false });
  assertEquals(await iteratorAsync.next(), { value: 2, done: false });
  assertEquals(await iteratorAsync.next(), { value: 3, done: false });
  assertEquals(await iteratorAsync.next(), { value: 4, done: false });
  assertEquals(await iteratorAsync.next(), { value: 5, done: false });
  assertEquals(await iteratorAsync.next(), { value: 6, done: false });
  assertEquals(await iteratorAsync.next(), { value: 7, done: false });
});

Deno.test("doesn't start the iterable until the last minute", () => {
  const oneTwoThree = {
    [Symbol.iterator]: spy(() => {
      let n = 0;
      return {
        next() {
          if (n > 3) {
            return { done: true, value: undefined };
          } else {
            n++;
            return { done: false, value: n };
          }
        },
      };
    }),
  };

  const result = concat([1, 2], oneTwoThree);
  const iterator = result[Symbol.iterator]();

  iterator.next();
  iterator.next();
  assertSpyCalls(oneTwoThree[Symbol.iterator], 0);

  iterator.next();
  assertSpyCalls(oneTwoThree[Symbol.iterator], 1);

  iterator.next();
  assertSpyCalls(oneTwoThree[Symbol.iterator], 1);
});
