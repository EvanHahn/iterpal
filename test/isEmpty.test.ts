import { assert, assertFalse } from "assert";

import { isEmpty } from "../mod.ts";

Deno.test("returns true for empty iterables", () => {
  const customEmpty = {
    *[Symbol.iterator]() {},
  };

  assert(isEmpty([]));
  assert(isEmpty(new Set()));
  assert(isEmpty(new Map()));
  assert(isEmpty(customEmpty));
});

Deno.test("returns false for non-empty iterables", () => {
  const everyNumber = {
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) {
        yield i;
      }
    },
  };

  assertFalse(isEmpty([1]));
  assertFalse(isEmpty(new Set([1])));
  assertFalse(isEmpty(new Map([["hi", 5]])));
  assertFalse(isEmpty(everyNumber));
});
