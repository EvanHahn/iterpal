import { assert, assertFalse } from "assert";

import { asyncify, emptyAsyncIterable, some } from "../mod.ts";

const isThree = (n: number) => n === 3;

Deno.test("returns false for empty iterables", async () => {
  const alwaysTrue = () => true;

  assertFalse(some([], alwaysTrue));
  assertFalse(some(new Map(), alwaysTrue));

  assertFalse(await some(emptyAsyncIterable, alwaysTrue));
});

Deno.test(
  "returns true if any of the elements return true, stopping after something is found",
  async () => {
    const everyNumberSync = {
      *[Symbol.iterator]() {
        for (let i = 0; true; i++) {
          yield i;
        }
      },
    };
    assert(some([1, 2, 3, 4], isThree));
    assert(some(new Set([1, 2, 3, 4]), isThree));
    assert(some(everyNumberSync, isThree));

    const everyNumberAsync = asyncify(everyNumberSync);
    assert(await some(everyNumberAsync, isThree));
  },
);

Deno.test("returns false if none of the elements return true", async () => {
  assertFalse(some([1, 2, 4], isThree));
  assertFalse(some(new Set([1, 2, 4]), isThree));

  assertFalse(await some(asyncify([1, 2, 4]), isThree));
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
  assert(some(hybrid, isThree));
});
