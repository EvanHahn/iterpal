import { assert, assertEquals } from "assert";

import { repeat } from "../mod.ts";

Deno.test("returns an infinite iterable if passed just one argument", () => {
  const objForReferenceCheck = {};
  const iterator = repeat(objForReferenceCheck)[Symbol.iterator]();

  for (let i = 0; i < 100; i++) {
    assertEquals(iterator.next(), { value: objForReferenceCheck, done: false });
  }
});

Deno.test("returns a bounded iterable if passed two arguments", () => {
  assertEquals([...repeat("foo", 0)], []);
  assertEquals([...repeat("foo", 1)], ["foo"]);

  const objForReferenceCheck = {};
  const resultArr = [...repeat(objForReferenceCheck, 10)];
  assertEquals(resultArr.length, 10);
  assert(resultArr.every((value) => value === objForReferenceCheck));
});
