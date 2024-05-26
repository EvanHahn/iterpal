import { assertEquals } from "assert";

import { arrayFrom, fromReadableStream } from "../mod.ts";

Deno.test("converts an empty readable stream to an iterable", async () => {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(1);
      controller.enqueue(2);
      controller.enqueue(3);
      controller.close();
    },
  });

  assertEquals(await arrayFrom(fromReadableStream(stream)), [1, 2, 3]);
});
