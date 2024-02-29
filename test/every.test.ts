import { assert, assertFalse } from "assert";
import { assertSpyCalls, spy } from "mock";

import { asyncify, emptyAsyncIterable, every } from "../mod.ts";

const isThree = (n: number) => n === 3;

Deno.test("returns true for empty iterables", async () => {
  const alwaysFalse = spy(() => false);

  assert(every([], alwaysFalse));
  assert(every(new Map(), alwaysFalse));

  assert(await every(emptyAsyncIterable, alwaysFalse));

  assertSpyCalls(alwaysFalse, 0);
});

Deno.test("returns true if all of the elements return true", async () => {
  assert(every([3], isThree));
  assert(every(new Set([3, 3]), isThree));
  assert(every([3, 3, 3], isThree));

  assert(await every(asyncify([3, 3, 3]), isThree));
});

Deno.test("returns false if any of the elements return false", async () => {
  assertFalse(every([1, 2, 3, 4], isThree));
  assertFalse(every(new Set([1, 2, 3, 4]), isThree));

  assertFalse(await every(asyncify([1, 2, 3, 4]), isThree));
});

Deno.test("prefers sync iterables", () => {
  const hybrid: Iterable<number> & AsyncIterable<number> = {
    *[Symbol.iterator]() {
      yield* [3, 3, 3];
    },
    async *[Symbol.asyncIterator]() {
      yield* [3, 2, 1];
    },
  };
  assert(every(hybrid, isThree));
});
