import test from "ava";
import take from "../take.js";

import fibonacci from "../fibonacci.js";

test("yields the Fibonacci sequence", (t) => {
  const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
  const actual = [...take(fibonacci(), 12)];
  t.deepEqual(actual, expected);
});
