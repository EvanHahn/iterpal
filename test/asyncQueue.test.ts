import { assertEquals } from "assert";

import AsyncQueue from "../src/_asyncQueue.ts";

Deno.test("async queue: pushing, then pulling", async () => {
  const queue = new AsyncQueue<number>();
  const pull = async () => (await queue.next()).value;

  queue.push(1);
  queue.push(2);
  queue.push(3);
  assertEquals(await pull(), 1);
  assertEquals(await pull(), 2);
  assertEquals(await pull(), 3);
});

Deno.test("async queue: pulling, then pushing", async () => {
  const queue = new AsyncQueue<number>();
  const pull = async () => (await queue.next()).value;

  const pullA = pull();
  const pullB = pull();
  const pullC = pull();
  queue.push(1);
  assertEquals(await pullA, 1);
  queue.push(2);
  assertEquals(await pullB, 2);
  queue.push(3);
  assertEquals(await pullC, 3);
});
