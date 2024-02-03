import { assert, assertFalse } from "assert";

import { some } from "../mod.ts";

const isThree = (n: number) => n === 3;

Deno.test("returns false for empty iterables", () => {
  const alwaysTrue = () => true;

  assertFalse(some([], alwaysTrue));
  assertFalse(some(new Map(), alwaysTrue));
});

Deno.test(
  "returns true if any of the elements return true, stopping after something is found",
  () => {
    const everyNumber = {
      *[Symbol.iterator]() {
        for (let i = 0; true; i++) {
          yield i;
        }
      },
    };

    assert(some([1, 2, 3, 4], isThree));
    assert(some(new Set([1, 2, 3, 4]), isThree));
    assert(some(everyNumber, isThree));
  },
);

Deno.test("returns false if none of the elements return true", () => {
  assertFalse(some([1, 2, 4], isThree));
  assertFalse(some(new Set([1, 2, 4]), isThree));
});
