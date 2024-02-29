import isSync from "./_isSync.ts";

export default cycle;

/** @ignored */
function cycle<T>(iterable: Iterable<T>): Iterable<T>;

/** @ignored */
function cycle<T>(iterable: AsyncIterable<T>): AsyncIterable<T>;

/**
 * Returns an infinite iterable that "cycles" over `iterable`.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 *
 * If `iterable` is empty, an error will be thrown. This can happen if the iterable is initially empty, or empty after being "exhausted" after the first cycle completes.
 *
 * @example
 * ```typescript
 * cycle([1, 2, 3]);
 * // => Iterable yielding 1, 2, 3, 1, 2, 3, 1, 2, 3 ...
 * ```
 */
function cycle<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): Iterable<T> | AsyncIterable<T> {
  return isSync(iterable)
    ? new CycleIterable(iterable)
    : new CycleAsyncIterable(iterable);
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

class CycleAsyncIterable<T> implements AsyncIterable<T> {
  #iterable: AsyncIterable<T>;

  constructor(iterable: AsyncIterable<T>) {
    this.#iterable = iterable;
  }

  [Symbol.asyncIterator]() {
    const iterable = this.#iterable;
    let iterator = iterable[Symbol.asyncIterator]();

    return {
      async next() {
        let nextIteration = await iterator.next();

        if (nextIteration.done) {
          iterator = iterable[Symbol.asyncIterator]();
          nextIteration = await iterator.next();
          if (nextIteration.done) {
            throw new Error("Cannot cycle an empty iterable");
          }
        }

        return nextIteration;
      },
    };
  }
}
