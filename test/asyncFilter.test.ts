import { assertEquals } from "assert";
import { assertSpyCalls, spy } from "mock";

import { asyncFilter, asyncify, asyncIterableToArray } from "../mod.ts";

Deno.test("does nothing to empty iterables", async () => {
  const fn = spy(() => true);
  const empty = {
    async *[Symbol.asyncIterator]() {},
  };

  const result = asyncFilter(empty, fn);
  const asArray = await asyncIterableToArray(result);
  assertEquals(asArray, []);

  assertSpyCalls(fn, 0);
});

Deno.test("returns a new iterator with values filtered", async () => {
  const fn = spy((n: number) => Promise.resolve(Boolean(n % 2)));
  const result = asyncFilter(asyncify([1, 2, 3, 4, 5]), fn);

  assertSpyCalls(fn, 0);

  const asArray = await asyncIterableToArray(result);
  assertEquals(asArray, [1, 3, 5]);

  assertSpyCalls(fn, 5);
});

Deno.test("can filter an infinite iterable", async () => {
  const everyNumber = {
    async *[Symbol.asyncIterator]() {
      for (let i = 1; true; i++) {
        yield i;
      }
    },
  };

  const fn = (n: number) => Boolean(n % 2);
  const result = asyncFilter(everyNumber, fn);
  const iterator = result[Symbol.asyncIterator]();

  assertEquals(await iterator.next(), { value: 1, done: false });
  assertEquals(await iterator.next(), { value: 3, done: false });
  assertEquals(await iterator.next(), { value: 5, done: false });
  assertEquals(await iterator.next(), { value: 7, done: false });
});

Deno.test("works with sync iterables", async () => {
  const isOdd = (n: number) => Boolean(n % 2);
  const result = asyncFilter([1, 2, 3, 4, 5], isOdd);

  const asArray = await asyncIterableToArray(result);
  assertEquals(asArray, [1, 3, 5]);
});
