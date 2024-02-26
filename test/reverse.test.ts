import { assertEquals } from "assert";

import { reverse } from "../mod.ts";

Deno.test("reverses iterables", () => {
  assertEquals([...reverse([])], []);
  assertEquals([...reverse([1, 2, 3])], [3, 2, 1]);
});
