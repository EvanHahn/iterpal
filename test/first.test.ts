import { assertEquals } from "assert";

import { first } from "../mod.ts";

Deno.test("returns undefined for empty iterables", () => {
  const customEmpty = {
    *[Symbol.iterator]() {},
  };

  assertEquals(first([]), undefined);
  assertEquals(first(new Set()), undefined);
  assertEquals(first(new Map()), undefined);
  assertEquals(first(customEmpty), undefined);
});

Deno.test("returns the first value", () => {
  const everyNumber = {
    *[Symbol.iterator]() {
      for (let i = 1; true; i++) {
        yield i;
      }
    },
  };
  const objToTestReferenceEquality = {};

  assertEquals(first(everyNumber), 1);
  assertEquals(first([objToTestReferenceEquality]), objToTestReferenceEquality);
});
