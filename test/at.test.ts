import { assertEquals } from "assert";

import { asyncify, at } from "../mod.ts";

Deno.test(
  "returns undefined when accessing an out-of-bounds value",
  async () => {
    assertEquals(at(["a", "b", "c"], 3), undefined);
    assertEquals(at(["a", "b", "c"], 4), undefined);
    assertEquals(at(["a", "b", "c"], 100), undefined);
    assertEquals(at(["a", "b", "c"], -4), undefined);
    assertEquals(at("abc", 3), undefined);

    const asyncIterable = asyncify(["a", "b", "c"]);
    assertEquals(await at(asyncIterable, 3), undefined);
    assertEquals(await at(asyncIterable, 4), undefined);
    assertEquals(await at(asyncIterable, 100), undefined);
    assertEquals(await at(asyncIterable, -4), undefined);
  },
);

Deno.test("returns the value at the nth iteration", async () => {
  const squaresSync = {
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) {
        yield i * i;
      }
    },
  };
  assertEquals(at("abcdef", 0), "a");
  assertEquals(at("abcdef", 3), "d");
  assertEquals(at(squaresSync, 0), 0);
  assertEquals(at(squaresSync, 1), 1);
  assertEquals(at(squaresSync, 2), 4);
  assertEquals(at(squaresSync, 100), 100 * 100);

  const squaresAsync = asyncify(squaresSync);
  assertEquals(await at(squaresAsync, 0), 0);
  assertEquals(await at(squaresAsync, 1), 1);
  assertEquals(await at(squaresAsync, 2), 4);
  assertEquals(await at(squaresAsync, 100), 100 * 100);
});

Deno.test("negative lookups", async () => {
  assertEquals(at("abc", -1), "c");
  assertEquals(at("abc", -2), "b");
  assertEquals(at("abc", -3), "a");

  const asyncNumbers = asyncify([1, 2]);
  assertEquals(await at(asyncNumbers, -1), 2);
  assertEquals(await at(asyncNumbers, -2), 1);
});

Deno.test("stops early if the iterator is done", async () => {
  let nextCallCount = 0;
  const firstThreeSync: Iterable<unknown> = {
    [Symbol.iterator]: () => {
      return {
        next: () => {
          nextCallCount++;
          if (nextCallCount > 2) {
            return { done: true, value: undefined };
          } else {
            return { done: false, value: nextCallCount };
          }
        },
      };
    },
  };
  at(firstThreeSync, 1000);
  assertEquals(nextCallCount, 3);

  nextCallCount = 0;
  const firstThreeAsync = asyncify(firstThreeSync);
  await at(firstThreeAsync, 1000);
  assertEquals(nextCallCount, 3);
});

Deno.test("prefers sync iterables", () => {
  const hybrid: Iterable<number> & AsyncIterable<number> = {
    *[Symbol.iterator]() {
      yield* [1, 2, 3];
    },
    async *[Symbol.asyncIterator]() {
      yield* [4, 5, 6];
    },
  };
  assertEquals(at(hybrid, 2), 3);
});
