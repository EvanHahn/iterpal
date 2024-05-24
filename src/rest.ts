import isSync from "./_isSync.ts";

export default rest;

/** @ignored */
function rest<T>(iterable: Iterable<T>): Iterable<T>;

/** @ignored */
function rest<T>(iterable: AsyncIterable<T>): AsyncIterable<T>;

/**
 * Skips the first element of an iterable.
 *
 * Works with sync and async iterables.
 *
 * @example
 * ```typescript
 * [...rest([1, 2, 3])];
 * // => [2, 3]
 * ```
 */
function rest<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): Iterable<T> | AsyncIterable<T> {
  return isSync(iterable)
    ? new RestIterable(iterable)
    : new RestAsyncIterable(iterable);
}

class RestIterable<T> implements Iterable<T> {
  #iterable: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this.#iterable = iterable;
  }

  [Symbol.iterator]() {
    const result = this.#iterable[Symbol.iterator]();
    result.next();
    return result;
  }
}

class RestAsyncIterable<T> implements AsyncIterable<T> {
  #iterable: AsyncIterable<T>;

  constructor(iterable: AsyncIterable<T>) {
    this.#iterable = iterable;
  }

  [Symbol.asyncIterator]() {
    return new RestAsyncIterator(this.#iterable[Symbol.asyncIterator]());
  }
}

class RestAsyncIterator<T> implements AsyncIterator<T> {
  #iterator: AsyncIterator<T>;
  #hasSeenFirst = false;

  constructor(iterator: AsyncIterator<T>) {
    this.#iterator = iterator;
  }

  async next(): Promise<IteratorResult<T>> {
    if (!this.#hasSeenFirst) {
      await this.#iterator.next();
      this.#hasSeenFirst = true;
    }
    return this.#iterator.next();
  }
}
