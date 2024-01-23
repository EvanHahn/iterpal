import { assertEquals } from "assert";
import take from "../take.js";

import fibonacci from "../fibonacci.js";

Deno.test("yields the Fibonacci sequence", () => {
  const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
  const actual = [...take(fibonacci(), 12)];
  assertEquals(actual, expected);
});
