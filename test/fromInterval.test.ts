import { assertEquals } from "assert";
import { FakeTime } from "time";

import { fromInterval } from "../mod.ts";

Deno.test("from interval", async () => {
  const time = new FakeTime();

  const tick = async (ms: number) => {
    await time.tickAsync(ms);
  };

  try {
    const result: number[] = [];

    (async () => {
      for await (const value of fromInterval(1000)) {
        result.push(value);
      }
    })();

    assertEquals(result, []);
    await tick(999);
    assertEquals(result, []);

    await tick(1);
    assertEquals(result, [0]);
    await tick(999);
    assertEquals(result, [0]);

    await tick(1);
    assertEquals(result, [0, 1]);

    await tick(1000 * 4);
    await tick(1);
    assertEquals(result, [0, 1, 2, 3, 4, 5]);
  } finally {
    time.restore();
  }
});
