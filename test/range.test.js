import { assertEquals } from "assert";

import range from "../range.js";

Deno.test("returns an infinite range of integers by default", () => {
  const iterator = range()[Symbol.iterator]();

  for (let i = 0; i < 100; i++) {
    assertEquals(iterator.next(), { value: i, done: false });
  }
});

Deno.test('returns a range starting at "start" if one argument is passed', () => {
  const startingAt0 = range(0)[Symbol.iterator]();
  for (let i = 0; i < 100; i++) {
    assertEquals(startingAt0.next(), { value: i, done: false });
  }

  const startingAt10 = range(10)[Symbol.iterator]();
  for (let i = 10; i < 100; i++) {
    assertEquals(startingAt10.next(), { value: i, done: false });
  }

  const startingAtFraction = range(1.5)[Symbol.iterator]();
  for (let i = 1.5; i < 100; i++) {
    assertEquals(startingAtFraction.next(), { value: i, done: false });
  }

  const bigIntStart = range(BigInt(5))[Symbol.iterator]();
  for (let i = BigInt(5); i < BigInt(100); i++) {
    assertEquals(bigIntStart.next(), { value: i, done: false });
  }
});

Deno.test('returns a range starting at "start" and stopping at "end" if two arguments are passed', () => {
  assertEquals([...range(0, 0)], []);
  assertEquals([...range(1, 1)], []);
  assertEquals([...range(100, 100)], []);

  assertEquals([...range(0, 1)], [0]);
  assertEquals([...range(0, 2)], [0, 1]);
  assertEquals([...range(5, 10)], [5, 6, 7, 8, 9]);

  assertEquals([...range(1.5, 6.5)], [1.5, 2.5, 3.5, 4.5, 5.5]);
  assertEquals([...range(1.5, 6.1)], [1.5, 2.5, 3.5, 4.5, 5.5]);
  assertEquals([...range(1.5, 6.6)], [1.5, 2.5, 3.5, 4.5, 5.5, 6.5]);

  assertEquals([...range(5, 4)], []);

  assertEquals([...range(BigInt(5), BigInt(8))], [5, 6, 7].map(BigInt));
});
