import test from "ava";

import primes from "../primes.js";

test("generates prime numbers", (t) => {
  const expectedPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

  const iterator = primes()[Symbol.iterator]();

  for (const expectedPrime of expectedPrimes) {
    t.deepEqual(iterator.next(), { done: false, value: expectedPrime });
  }
});
