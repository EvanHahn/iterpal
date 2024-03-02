import { assertEquals } from "assert";

import { arrayFrom, asyncify, compact, emptyAsyncIterable } from "../mod.ts";

Deno.test("does nothing to empty iterables", async () => {
  assertEquals([...compact([])], []);
  assertEquals([...compact(new Set())], []);

  assertEquals(
    await arrayFrom(compact(emptyAsyncIterable)),
    [],
  );
});

Deno.test("returns a new iterable with falsy values removed", async () => {
  const numbersWithFalsyMixedInSync: Iterable<unknown> = {
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) {
        yield i;
        yield* [false, null, undefined, 0, -0, 0n, NaN, ""];
      }
    },
  };
  const syncIterator = compact(numbersWithFalsyMixedInSync)[Symbol.iterator]();
  assertEquals(syncIterator.next(), { value: 1, done: false });
  assertEquals(syncIterator.next(), { value: 2, done: false });
  assertEquals(syncIterator.next(), { value: 3, done: false });

  const numbersWithFalsyMixedInAsync = asyncify(numbersWithFalsyMixedInSync);
  const asyncIterator = compact(numbersWithFalsyMixedInAsync)
    [Symbol.asyncIterator]();
  assertEquals(await asyncIterator.next(), { value: 1, done: false });
  assertEquals(await asyncIterator.next(), { value: 2, done: false });
  assertEquals(await asyncIterator.next(), { value: 3, done: false });
});

Deno.test("prefers sync iterables", () => {
  const hybrid: Iterable<number> & AsyncIterable<number> = {
    *[Symbol.iterator]() {
      yield* [1, 0, 3];
    },
    async *[Symbol.asyncIterator]() {
      yield* [4, 0, 6];
    },
  };

  assertEquals([...compact(hybrid)], [1, 3]);
});
