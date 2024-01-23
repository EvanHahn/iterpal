import { assertEquals } from "assert";

import primes from "../primes.js";

Deno.test("generates prime numbers", () => {
  const expectedPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

  const iterator = primes()[Symbol.iterator]();

  for (const expectedPrime of expectedPrimes) {
    assertEquals(iterator.next(), { done: false, value: expectedPrime });
  }
});
