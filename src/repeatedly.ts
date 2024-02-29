/**
 * Returns an iterable that yields `fn(iterationCount)` every time. Useful when
 * "converting" a function to an iterable.
 *
 * @example
 * ```typescript
 * repeatedly(Math.random);
 * // => Iterable yielding random numbers
 *
 * repeatedly((n) => `Iteration #${n + 1}`);
 * // => Iterable yielding "Iteration 1", "Iteration 2", "Iteration 3" ...
 * ```
 */
export default function repeatedly<T>(
  fn: (iterationCount: number) => T,
): Iterable<T> {
  return new RepeatedlyIterable(fn);
}

class RepeatedlyIterable<T> implements Iterable<T> {
  #fn: (iterationCount: number) => T;

  constructor(fn: (iterationCount: number) => T) {
    this.#fn = fn;
  }

  [Symbol.iterator]() {
    const fn = this.#fn;

    let iterationCount = 0;
    return {
      next() {
        const value = fn(iterationCount);
        iterationCount++;
        return {
          done: false,
          value,
        };
      },
    };
  }
}
