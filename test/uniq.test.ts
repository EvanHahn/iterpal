import { assertEquals } from "assert";

import { uniq } from "../mod.ts";

Deno.test("returns an iterable without duplicates", async () => {
  const numbersSync: Iterable<number> = {
    *[Symbol.iterator]() {
      yield* [1, 2, 3];
      yield* [3, 2, 1];
      for (let i = 1; true; i++) yield i;
    },
  };
  const syncIterator = uniq(numbersSync)[Symbol.iterator]();
  assertEquals(syncIterator.next(), { value: 1, done: false });
  assertEquals(syncIterator.next(), { value: 2, done: false });
  assertEquals(syncIterator.next(), { value: 3, done: false });
  assertEquals(syncIterator.next(), { value: 4, done: false });
  assertEquals(syncIterator.next(), { value: 5, done: false });

  const numbersAsync: AsyncIterable<number> = {
    async *[Symbol.asyncIterator]() {
      yield* [1, 2, 3];
      yield* [3, 2, 1];
      for (let i = 1; true; i++) yield i;
    },
  };
  const asyncIterator = uniq(numbersAsync)[Symbol.asyncIterator]();
  assertEquals(await asyncIterator.next(), { value: 1, done: false });
  assertEquals(await asyncIterator.next(), { value: 2, done: false });
  assertEquals(await asyncIterator.next(), { value: 3, done: false });
  assertEquals(await asyncIterator.next(), { value: 4, done: false });
  assertEquals(await asyncIterator.next(), { value: 5, done: false });
});

Deno.test("prefers sync iterables", () => {
  const hybrid: Iterable<number> & AsyncIterable<number> = {
    *[Symbol.iterator]() {
      yield* [1, 2, 1];
    },
    async *[Symbol.asyncIterator]() {
      yield* [4, 5, 4];
    },
  };
  assertEquals([...uniq(hybrid)], [1, 2]);
});
