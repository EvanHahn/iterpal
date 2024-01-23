import { assert, assertFalse } from "assert";

import every from "../every.js";

Deno.test("returns true for empty iterables", () => {
  const alwaysFalse = () => false;
  assert(every([], alwaysFalse));
  assert(every(new Map(), alwaysFalse));
});

Deno.test("returns true if all of the elements return true", () => {
  const isThree = (n) => n === 3;

  assert(every([3], isThree));
  assert(every(new Set([3, 3]), isThree));
  assert(every([3, 3, 3], isThree));
});

Deno.test("returns false if every of the elements return false", () => {
  const isThree = (n) => n === 3;

  assertFalse(every([1, 2, 3, 4], isThree));
  assertFalse(every(new Set([1, 2, 3, 4]), isThree));
});
