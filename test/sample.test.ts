import { assert, assertEquals } from "assert";

import { asyncify, concat, emptyAsyncIterable, sample } from "../mod.ts";

const assertIsValid = (element: unknown) => {
  assert(
    (element === 9) || (element === 8) || (element === 7),
    "Value should be 9, 8, or 7",
  );
};

Deno.test("returns undefined for empty iterables", async () => {
  assertEquals(sample([]), undefined);
  assertEquals(sample(new Set()), undefined);
  assertEquals(sample(concat()), undefined);

  assertEquals(await sample(emptyAsyncIterable), undefined);
});

Deno.test("returns a random element if the iterable is of known size", () => {
  assertIsValid(sample([9, 8, 7, 7, 8, 9]));
  assertIsValid(sample(new Set([9, 8, 7])));
  assertIsValid(sample(new Uint8Array([9, 8, 7, 7, 8, 9])));
  assertIsValid(
    sample(
      new Map([
        ["foo", 9],
        ["bar", 8],
        ["baz", 7],
      ]),
    )?.[1],
  );
});

Deno.test("returns a random element", async () => {
  assertIsValid(sample(concat([9, 8, 7, 7, 8, 9])));
  assertIsValid(await sample(asyncify([9, 8, 7, 7, 8, 9])));
});
