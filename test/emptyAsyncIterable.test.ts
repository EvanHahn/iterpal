import { emptyAsyncIterable } from "../mod.ts";

Deno.test("empty async iterable", async () => {
  for await (const _ of emptyAsyncIterable) {
    throw new Error("This should never happen");
  }
});
