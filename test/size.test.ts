import { assertEquals } from "assert";

import size from "../size.ts";

Deno.test("returns the size of an iterable", () => {
  const customIterable = {
    *[Symbol.iterator]() {
      yield "foo";
      yield "bar";
      yield "baz";
    },
  };

  assertEquals(size([]), 0);
  assertEquals(size(""), 0);
  assertEquals(size(new Set()), 0);
  assertEquals(size(new Map()), 0);

  assertEquals(size(["a"]), 1);
  assertEquals(size("a"), 1);
  assertEquals(size(new Set(["a"])), 1);
  assertEquals(size(new Map([["a", "b"]])), 1);

  assertEquals(size(customIterable), 3);
});
