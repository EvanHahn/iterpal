import { assertEquals } from "assert";
import { assertSpyCalls, spy } from "mock";

import { arrayFrom, asyncify, emptyAsyncIterable, filter } from "../mod.ts";

Deno.test("does nothing to empty iterables", async () => {
  const fn = spy(() => true);

  assertEquals([...filter([], fn)], []);
  assertEquals([...filter(new Set(), fn)], []);
  assertEquals([...filter(new Map(), fn)], []);

  assertEquals(
    await arrayFrom(filter(emptyAsyncIterable, fn)),
    [],
  );

  assertSpyCalls(fn, 0);
});

Deno.test("returns a new iterator with values filtered", async () => {
  const fn = spy((n: number) => Boolean(n % 2));

  const resultSync = filter([1, 2, 3, 4, 5], fn);
  assertSpyCalls(fn, 0);
  assertEquals([...resultSync], [1, 3, 5]);
  assertSpyCalls(fn, 5);

  const resultAsync = filter(asyncify([1, 2, 3, 4, 5]), fn);
  assertSpyCalls(fn, 5);
  assertEquals(await arrayFrom(resultAsync), [1, 3, 5]);
  assertSpyCalls(fn, 10);
});

Deno.test("can filter an infinite iterable", async () => {
  const fn = (n: number) => Boolean(n % 2);

  const everyNumberSync = {
    *[Symbol.iterator]() {
      for (let i = 1; true; i++) {
        yield i;
      }
    },
  };

  const iteratorSync = filter(everyNumberSync, fn)[Symbol.iterator]();
  assertEquals(iteratorSync.next(), { value: 1, done: false });
  assertEquals(iteratorSync.next(), { value: 3, done: false });
  assertEquals(iteratorSync.next(), { value: 5, done: false });
  assertEquals(iteratorSync.next(), { value: 7, done: false });

  const everyNumberAsync = asyncify(everyNumberSync);
  const iteratorAsync = filter(everyNumberAsync, fn)[Symbol.asyncIterator]();
  assertEquals(await iteratorAsync.next(), { value: 1, done: false });
  assertEquals(await iteratorAsync.next(), { value: 3, done: false });
  assertEquals(await iteratorAsync.next(), { value: 5, done: false });
  assertEquals(await iteratorAsync.next(), { value: 7, done: false });
});

Deno.test("prefers sync iterables", () => {
  const fn = (n: number) => Boolean(n % 2);

  const hybrid: Iterable<number> & AsyncIterable<number> = {
    *[Symbol.iterator]() {
      yield* [1, 2, 3];
    },
    async *[Symbol.asyncIterator]() {
      yield* [4, 5, 6];
    },
  };

  assertEquals([...filter(hybrid, fn)], [1, 3]);
});
