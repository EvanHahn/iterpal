import isSync from "./_isSync.ts";
import last from "./last.ts";

export default drop;

/** @ignored */
function drop<T>(iterable: Iterable<T>, amount: number): Iterable<T>;

/** @ignored */
function drop<T>(iterable: AsyncIterable<T>, amount: number): AsyncIterable<T>;

/**
 * Returns an iterable with the first `amount` elements removed.
 *
 * Works with sync and async iterables.
 *
 * @example
 * ```typescript
 * drop(new Set(["hello", "to", "the", "world!"]), 2);
 * // => Iterable yielding 'the', 'world'
 *
 * drop(new Set(["hello", "to", "the", "world!"]), 4);
 * // => Empty iterable
 * ```
 */
function drop<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  amount: number,
): Iterable<T> | AsyncIterable<T> {
  return isSync(iterable)
    ? new DropIterable(iterable, amount)
    : new DropAsyncIterable(iterable, amount);
}

class DropIterable<T> implements Iterable<T> {
  #iterable: Iterable<T>;
  #amount: number;

  constructor(iterable: Iterable<T>, amount: number) {
    this.#iterable = iterable;
    this.#amount = amount;
  }

  [Symbol.iterator]() {
    const iterator = this.#iterable[Symbol.iterator]();
    let remaining = this.#amount;
    return {
      next() {
        for (; remaining; remaining--) iterator.next();
        return iterator.next();
      },
    };
  }
}

class DropAsyncIterable<T> implements AsyncIterable<T> {
  #iterable: AsyncIterable<T>;
  #amount: number;

  constructor(iterable: AsyncIterable<T>, amount: number) {
    this.#iterable = iterable;
    this.#amount = amount;
  }

  [Symbol.asyncIterator](): AsyncIterator<T> {
    const iterator = this.#iterable[Symbol.asyncIterator]();
    let remaining = this.#amount;
    return {
      async next(): Promise<IteratorResult<T>> {
        const promises: Array<Promise<IteratorResult<T>>> = [];
        for (; remaining; remaining--) promises.push(iterator.next());
        promises.push(iterator.next());
        return last(await Promise.all(promises))!;
      },
    };
  }
}
