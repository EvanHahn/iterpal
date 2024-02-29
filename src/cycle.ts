/**
 * Returns an infinite iterable that "cycles" over `iterable`.
 *
 * If `iterable` is empty, an error will be thrown. This can happen if the iterable is initially empty, or empty after being "exhausted" after the first cycle completes.
 *
 * @example
 * ```typescript
 * cycle([1, 2, 3]);
 * // => Iterable yielding 1, 2, 3, 1, 2, 3, 1, 2, 3 ...
 * ```
 */
export default function cycle<T>(iterable: Iterable<T>): Iterable<T> {
  return new CycleIterable(iterable);
}

class CycleIterable<T> implements Iterable<T> {
  #iterable: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this.#iterable = iterable;
  }

  [Symbol.iterator]() {
    const iterable = this.#iterable;
    let iterator = iterable[Symbol.iterator]();

    return {
      next() {
        let nextIteration = iterator.next();

        if (nextIteration.done) {
          iterator = iterable[Symbol.iterator]();
          nextIteration = iterator.next();
          if (nextIteration.done) {
            throw new Error("Cannot cycle an empty iterable");
          }
        }

        return nextIteration;
      },
    };
  }
}
