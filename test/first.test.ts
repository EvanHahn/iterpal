import { assertEquals } from "assert";

import { asyncify, emptyAsyncIterable, first } from "../mod.ts";

Deno.test("returns undefined for empty iterables", async () => {
  const customEmptySync = {
    *[Symbol.iterator]() {},
  };
  assertEquals(first([]), undefined);
  assertEquals(first(new Set()), undefined);
  assertEquals(first(new Map()), undefined);
  assertEquals(first(customEmptySync), undefined);

  assertEquals(await first(emptyAsyncIterable), undefined);
});

Deno.test("returns the first value", async () => {
  const everyNumberSync = {
    *[Symbol.iterator]() {
      for (let i = 1; true; i++) {
        yield i;
      }
    },
  };
  const objToTestReferenceEquality = {};
  assertEquals(first(everyNumberSync), 1);
  assertEquals(first([objToTestReferenceEquality]), objToTestReferenceEquality);

  const everyNumberAsync = asyncify(everyNumberSync);
  assertEquals(await first(everyNumberAsync), 1);
});
