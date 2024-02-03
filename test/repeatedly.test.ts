import { assertEquals } from "assert";
import { assertSpyCalls, spy } from "mock";

import { repeatedly } from "../mod.ts";

Deno.test("calls a function over and over", () => {
  const double = spy((n: number) => n + n);
  const doubleIterable = repeatedly(double);

  const iterator1 = doubleIterable[Symbol.iterator]();
  assertEquals(iterator1.next(), { value: 0, done: false });
  assertEquals(iterator1.next(), { value: 2, done: false });
  assertEquals(iterator1.next(), { value: 4, done: false });
  assertEquals(iterator1.next(), { value: 6, done: false });
  assertSpyCalls(double, 4);

  const iterator2 = doubleIterable[Symbol.iterator]();
  assertEquals(iterator2.next(), { value: 0, done: false });
  assertEquals(iterator2.next(), { value: 2, done: false });
  assertEquals(iterator2.next(), { value: 4, done: false });
  assertEquals(iterator2.next(), { value: 6, done: false });
  assertSpyCalls(double, 8);
});
