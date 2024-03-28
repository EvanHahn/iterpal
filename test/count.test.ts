import { assertEquals } from "assert";

import { count, take } from "../mod.ts";

Deno.test("counts from start, by step", () => {
  assertEquals(
    [...take(count(10, 5), 4)],
    [10, 15, 20, 25],
  );
});

Deno.test("default values", () => {
  assertEquals(
    [...take(count(), 4)],
    [0, 1, 2, 3],
  );
  assertEquals(
    [...take(count(3), 4)],
    [3, 4, 5, 6],
  );
});
