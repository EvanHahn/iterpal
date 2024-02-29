import { assertEquals } from "assert";

import { size } from "../mod.ts";

Deno.test("returns the size of a sync iterable", () => {
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
  assertEquals(size("🌍"), 1);
  assertEquals(size(new Set(["a"])), 1);
  assertEquals(size(new Map([["a", "b"]])), 1);

  assertEquals(size(customIterable), 3);
});

Deno.test("resolves with the size of an async iterable", async () => {
  const customIterable = {
    async *[Symbol.asyncIterator]() {
      yield "foo";
      yield "bar";
      yield "baz";
    },
  };

  assertEquals(await size(customIterable), 3);
});

Deno.test("prefers sync iterables", () => {
  const hybrid: Iterable<number> & AsyncIterable<number> = {
    *[Symbol.iterator]() {
      yield* [1, 2, 3];
    },
    async *[Symbol.asyncIterator]() {
      yield* [4, 5];
    },
  };
  assertEquals(size(hybrid), 3);
});
