import { assertEquals, assertNotStrictEquals } from "assert";
import { arrayFrom, asyncify } from "../mod.ts";

Deno.test("converts an empty sync iterable to an async one", async () => {
  const empty = {
    *[Symbol.iterator]() {},
  };
  const emptyAsync = asyncify(empty);
  assertEquals(await arrayFrom(emptyAsync), []);
});

Deno.test("converts a non-empty sync iterable to an async one", async () => {
  const result = asyncify([1, 2, 3]);
  assertEquals(await arrayFrom(result), [1, 2, 3]);
});

Deno.test("converts a sync infinite iterable to an async one", async () => {
  const everyNumber = {
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) {
        yield i;
      }
    },
  };
  const iterator = asyncify(everyNumber)[Symbol.asyncIterator]();

  assertEquals(await iterator.next(), { done: false, value: 0 });
  assertEquals(await iterator.next(), { done: false, value: 1 });
  assertEquals(await iterator.next(), { done: false, value: 2 });
  assertEquals(await iterator.next(), { done: false, value: 3 });
  assertEquals(await iterator.next(), { done: false, value: 4 });
});

Deno.test("copies async iterables", async () => {
  const input = asyncify([1, 2, 3]);

  const result = asyncify(input);

  assertNotStrictEquals(result, input);

  assertEquals(await arrayFrom(result), [1, 2, 3]);
});

Deno.test(
  'if object is both kinds of iterable, "prefers" async iterables when making copy',
  async () => {
    const both = {
      [Symbol.iterator]() {
        throw new Error("This should never be called");
      },
      *[Symbol.asyncIterator]() {
        yield 1;
        yield 2;
        yield 3;
      },
    };

    const result = asyncify(both);

    assertEquals(await arrayFrom(result), [1, 2, 3]);
  },
);
