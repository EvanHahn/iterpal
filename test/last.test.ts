import { assertEquals } from "assert";

import { last } from "../mod.ts";

Deno.test("returns undefined for empty iterables", () => {
  const customEmpty = {
    *[Symbol.iterator]() {},
  };

  assertEquals(last([]), undefined);
  assertEquals(last(new Set()), undefined);
  assertEquals(last(new Map()), undefined);
  assertEquals(last(customEmpty), undefined);
});

Deno.test("returns the last value", () => {
  const customIterable = {
    *[Symbol.iterator]() {
      yield 1;
      yield 2;
      yield 3;
    },
  };

  assertEquals(last([1]), 1);
  assertEquals(last("🌎🌍🌍"), "🌍");
  assertEquals(last(new Set([1, 2, 3])), 3);
  assertEquals(last(customIterable), 3);
});
