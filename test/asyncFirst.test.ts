import { assertEquals } from "assert";

import { asyncFirst, asyncify, emptyAsyncIterable } from "../mod.ts";

Deno.test("returns undefined for empty iterables", async () => {
  assertEquals(await asyncFirst(emptyAsyncIterable), undefined);
});

Deno.test("returns the first value", async () => {
  const objToTestReferenceEquality = {};
  const iterable = asyncify([objToTestReferenceEquality, 1, 2]);

  assertEquals(await asyncFirst(iterable), objToTestReferenceEquality);
});
