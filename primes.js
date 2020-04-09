export default function primes () {
  return new PrimesIterable()
}

class PrimesIterable {
  // TODO: This is inefficient and could probably use the Sieve of Eratosthenes.
  * [Symbol.iterator] () {
    yield 2

    const existingPrimes = [2]

    for (let i = 3; true; i += 2) {
      let isPrime = true
      for (const existingPrime of existingPrimes) {
        if ((i % existingPrime) === 0) {
          isPrime = false
          break
        }
      }

      if (isPrime) {
        yield i
        existingPrimes.push(i)
      }
    }
  }
}
