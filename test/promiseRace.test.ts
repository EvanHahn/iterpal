import { assertEquals, assertRejects } from "assert";

import { asyncify, promiseRace } from "../mod.ts";

Deno.test("resolves with the first resolved promise", async () => {
  for (const isAsync of [false, true]) {
    const rawPromises = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.reject(3),
      Promise.reject(4),
    ];
    const promises = isAsync ? asyncify(rawPromises) : rawPromises;
    assertEquals(await promiseRace(promises), 1);
  }
});

Deno.test("rejects the first time a promise rejects", async () => {
  for (const isAsync of [false, true]) {
    const rawPromises = [
      Promise.reject(1),
      Promise.resolve(2),
      Promise.resolve(3),
      Promise.reject(4),
    ];
    const promises = isAsync ? asyncify(rawPromises) : rawPromises;
    const err = await assertRejects(() => promiseRace(promises));
    assertEquals(err, 1);
  }
});
