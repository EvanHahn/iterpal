import { assertEquals, assertRejects, assertThrows } from "assert";

import { arrayFrom, asyncify, cycle, take } from "../mod.ts";

Deno.test("throws when calling iterating if the iterable is empty", async () => {
  const customEmptySync = { *[Symbol.iterator]() {} };
  for (const iterable of [[], new Set(), customEmptySync]) {
    const iterator = cycle(iterable)[Symbol.iterator]();
    assertThrows(() => {
      iterator.next();
    });
  }

  const emptyAsync = { async *[Symbol.asyncIterator]() {} };
  const asyncIterator = cycle(emptyAsync)[Symbol.asyncIterator]();
  await assertRejects(() => asyncIterator.next());
});

Deno.test("throws if the iterable is exhausted after the first cycle", () => {
  let allDone = false;
  const once = {
    *[Symbol.iterator]() {
      if (allDone) return;
      yield* [1, 2, 3];
      allDone = true;
    },
  };

  const cycled = cycle(once)[Symbol.iterator]();

  cycled.next();
  cycled.next();
  cycled.next();

  assertThrows(() => {
    cycled.next();
  });
});

Deno.test("repeats a one-element iterable", async () => {
  const justOneSync = {
    *[Symbol.iterator]() {
      yield "hi";
    },
  };
  assertEquals([...take(cycle([1]), 5)], [1, 1, 1, 1, 1]);
  assertEquals([...take(cycle(justOneSync), 5)], [
    "hi",
    "hi",
    "hi",
    "hi",
    "hi",
  ]);

  const justOneAsync = asyncify([1]);
  assertEquals(
    await arrayFrom(take(cycle(justOneAsync), 3)),
    [1, 1, 1],
  );
});

Deno.test("repeats iterables", async () => {
  const abcSync = {
    *[Symbol.iterator]() {
      yield* ["a", "b", "c"];
    },
  };
  assertEquals([...take(cycle([1, 2, 3]), 7)], [1, 2, 3, 1, 2, 3, 1]);
  assertEquals([...take(cycle(abcSync), 5)], ["a", "b", "c", "a", "b"]);

  const abcAsync = asyncify(abcSync);
  assertEquals(
    await arrayFrom(take(cycle(abcAsync), 5)),
    ["a", "b", "c", "a", "b"],
  );
});

Deno.test("effectively does nothing to infinite iterables", () => {
  const infinite = {
    *[Symbol.iterator]() {
      for (let i = 5; true; i++) yield i;
    },
  };
  assertEquals([...take(cycle(infinite), 7)], [5, 6, 7, 8, 9, 10, 11]);
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
  assertEquals([...take(cycle(hybrid), 4)], [1, 2, 3, 1]);
});
