/**
 * Returns a new async iterable with `amount` elements taken from the beginning. If `amount` exceeds the number of elements, returns a copy of the whole iterable.
 *
 * @example
 * ```typescript
 * const iterable = asyncify(["hello", "to", "you!"]);
 *
 * asyncTake(iterable, 2);
 * // => Async iterable yielding "hello", "to"
 *
 * asyncTake(["hello", "to", "you!"], 200);
 * // => Async yielding "hello", "to", "you!"
 * ```
 */
export default function asyncTake<T>(
  asyncIterable: AsyncIterable<T>,
  n: number,
): AsyncIterable<T> {
  return new AsyncTakeIterable(asyncIterable, n);
}

class AsyncTakeIterable<T> implements AsyncIterable<T> {
  #iterable: AsyncIterable<T>;
  #n: number;

  constructor(iterable: AsyncIterable<T>, n: number) {
    this.#iterable = iterable;
    this.#n = n;
  }

  [Symbol.asyncIterator](): AsyncIterator<T> {
    return new AsyncTakeIterator(this.#iterable, this.#n);
  }
}

class AsyncTakeIterator<T> implements AsyncIterator<T> {
  #iterator: AsyncIterator<T>;
  #remaining: number;

  constructor(iterable: AsyncIterable<T>, n: number) {
    this.#iterator = iterable[Symbol.asyncIterator]();
    this.#remaining = n;
  }

  next(): Promise<IteratorResult<T>> {
    if (this.#remaining <= 0) {
      return Promise.resolve({ done: true, value: undefined });
    }

    this.#remaining--;

    return this.#iterator.next();
  }
}
