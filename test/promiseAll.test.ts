import { assert, assertEquals, assertRejects } from "assert";

import { asyncify, promiseAll } from "../mod.ts";

Deno.test("resolves with an empty array with empty iterables", async () => {
  assertEquals(await promiseAll([]), []);
  assertEquals(await promiseAll(asyncify([])), []);
});

Deno.test("resolves with the result of all the promises", async () => {
  for (const isAsync of [false, true]) {
    const { promise, resolve } = Promise.withResolvers();
    const rawArgs = [Promise.resolve(1), 2, promise];
    const args = isAsync ? asyncify(rawArgs) : rawArgs;

    const resultPromise = promiseAll(args);
    resolve(3);

    assertEquals(await resultPromise, [1, 2, 3]);
  }
});

Deno.test(
  "rejects (and stops iterating) the first time a promise rejects",
  async () => {
    const args: AsyncIterable<number | Promise<number>> = (async function* () {
      yield 1;
      yield Promise.resolve(2);
      yield Promise.reject(new Error("uh oh"));
      throw new Error("This should never be called");
    })();

    const err = await assertRejects(() => promiseAll(args));
    assert(err instanceof Error && err.message === "uh oh");
  },
);
