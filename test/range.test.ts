import { assertEquals, assertThrows } from "assert";

import range from "../range.ts";

Deno.test('returns a range from 0 to "end" if one argument is passed', () => {
  assertEquals([...range(0)], []);
  assertEquals([...range(4)], [0, 1, 2, 3]);
  assertEquals([...range(-1)], []);

  assertEquals([...range(4n)], [0n, 1n, 2n, 3n]);
  assertEquals([...range(-1n)], []);
});

Deno.test(
  "returns a range from start to end if two arguments are passed",
  () => {
    assertEquals([...range(1, 4)], [1, 2, 3]);
    assertEquals([...range(2, 2)], []);
    assertEquals([...range(2, -2)], []);

    assertEquals([...range(1n, 4n)], [1n, 2n, 3n]);
  },
);

Deno.test("returns a range from start to end with a customizable step", () => {
  assertEquals([...range(1, 10, 2)], [1, 3, 5, 7, 9]);
  assertEquals([...range(1, 10, -1)], []);

  assertEquals([...range(1n, 10n, 2n)], [1n, 3n, 5n, 7n, 9n]);
});

Deno.test("throws if passed floats", () => {
  assertThrows(() => range(1.5));
  assertThrows(() => range(1, 2.5));
  assertThrows(() => range(1, 2, 3.4));
});

Deno.test("throws if passed NaN", () => {
  assertThrows(() => range(NaN));
  assertThrows(() => range(1, NaN));
  assertThrows(() => range(1, 2, NaN));
});

Deno.test("throws if passed a 0 step", () => {
  assertThrows(() => range(1, 2, 0));
  assertThrows(() => range(1n, 2n, 0n));
});
