import isSync from "./_isSync.ts";

/** @ignored */
export default function <T>(iterable: Iterable<T>, amount: number): Iterable<T>;

/** @ignored */
export default function <T>(
  iterable: AsyncIterable<T>,
  amount: number,
): AsyncIterable<T>;

/**
 * Returns a new iterable with `amount` elements taken from the beginning. If `amount` exceeds the number of elements, returns a copy of the whole iterable.
 *
 * Works with sync and async iterables.
 *
 * @example
 * ```typescript
 * take(["hello", "to", "you!"], 2);
 * // => Iterable yielding "hello", "to"

 * take(["hello", "to", "you!"], 200);
 * // => Iterable yielding "hello", "to", "you!"
 * ```
 */
export default function <T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  amount: number,
): Iterable<T> | AsyncIterable<T> {
  return isSync(iterable)
    ? new TakeIterable(iterable, amount)
    : new TakeAsyncIterable(iterable, amount);
}

class TakeIterable<T> implements Iterable<T> {
  #iterable: Iterable<T>;
  #amount: number;

  constructor(iterable: Iterable<T>, amount: number) {
    this.#iterable = iterable;
    this.#amount = amount;
  }

  [Symbol.iterator]() {
    const iterator = this.#iterable[Symbol.iterator]();
    let amount = this.#amount;

    return {
      next() {
        if (amount === 0) return { done: true } as IteratorResult<T>;

        const nextIteration = iterator.next();
        if (nextIteration.done) {
          return { done: true } as IteratorResult<T>;
        } else {
          amount--;
          return nextIteration;
        }
      },
    };
  }
}

class TakeAsyncIterable<T> implements AsyncIterable<T> {
  #iterable: AsyncIterable<T>;
  #n: number;

  constructor(iterable: AsyncIterable<T>, n: number) {
    this.#iterable = iterable;
    this.#n = n;
  }

  [Symbol.asyncIterator](): AsyncIterator<T> {
    return new TakeAsyncIterator(this.#iterable, this.#n);
  }
}

class TakeAsyncIterator<T> implements AsyncIterator<T> {
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
