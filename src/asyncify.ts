import isAsync from "./_isAsync.ts";

/**
 * Make an iterable async.
 *
 * If the iterable is synchronous (e.g., defines `Symbol.iterator`), converts it to an async iterable. If the iterable is asynchronous (e.g., defines `Symbol.asyncIterator`), a copy is returned.
 *
 * In the unlikely event that both are defined, a copy of the async "part" is returned and the sync part is ignored.
 *
 * @example
 * ```typescript
 * asyncify([1, 2, 3, 4]);
 * // => Asynchronous iterable yielding 1, 2, 3, 4
 * ```
 */
export default function asyncify<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): AsyncIterable<T> {
  return isAsync(iterable)
    ? new CopyAsyncIterable(iterable)
    : new AsyncifyIterable(iterable);
}

class CopyAsyncIterable<T> implements AsyncIterable<T> {
  #iterable: AsyncIterable<T>;

  constructor(iterable: AsyncIterable<T>) {
    this.#iterable = iterable;
  }

  [Symbol.asyncIterator]() {
    const iterator = this.#iterable[Symbol.asyncIterator]();
    return { next: () => iterator.next() };
  }
}

class AsyncifyIterable<T> implements AsyncIterable<T> {
  #iterable: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this.#iterable = iterable;
  }

  [Symbol.asyncIterator]() {
    const iterator = this.#iterable[Symbol.iterator]();
    return {
      next() {
        return Promise.resolve(iterator.next());
      },
    };
  }
}
