import isSync from "./_isSync.ts";

/** @ignored */
export default function takeWhile<T>(
  iterable: Iterable<T>,
  fn: (value: T) => boolean,
): Iterable<T>;

/** @ignored */
export default function takeWhile<T>(
  iterable: AsyncIterable<T>,
  fn: (value: T) => boolean,
): AsyncIterable<T>;

/**
 * Returns a new iterable with elements taken from the beginning until `fn` returns false, or until the iterable has been exhausted.
 *
 * Works with sync and async iterables.
 *
 * @example
 * ```typescript
 * const isSmall = (n: number) => n < 4;
 *
 * takeWhile([1, 2, 3, 4, 5], isSmall);
 * // => Iterable yielding 1, 2, 3
 * ```
 */
export default function takeWhile<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T) => boolean,
): Iterable<T> | AsyncIterable<T> {
  return isSync(iterable)
    ? new TakeWhileIterable(iterable, fn)
    : new TakeWhileAsyncIterable(iterable, fn);
}

class TakeWhileIterable<T> implements Iterable<T> {
  #iterable: Iterable<T>;
  #fn: (value: T) => boolean;

  constructor(iterable: Iterable<T>, fn: (value: T) => boolean) {
    this.#iterable = iterable;
    this.#fn = fn;
  }

  [Symbol.iterator]() {
    return new TakeWhileIterator(this.#iterable[Symbol.iterator](), this.#fn);
  }
}

class TakeWhileIterator<T> implements Iterator<T> {
  #iterator: Iterator<T>;
  #fn: (value: T) => boolean;
  #done = false;

  constructor(iterator: Iterator<T>, fn: (value: T) => boolean) {
    this.#iterator = iterator;
    this.#fn = fn;
  }

  next(): IteratorResult<T> {
    if (this.#done) return { done: true } as IteratorResult<T>;

    const iteration = this.#iterator.next();
    if (iteration.done) {
      this.#done = true;
      return iteration;
    }

    const { value } = iteration;
    if (this.#fn(value)) {
      return iteration;
    } else {
      this.#done = true;
      return { done: true } as IteratorResult<T>;
    }
  }
}

class TakeWhileAsyncIterable<T> implements AsyncIterable<T> {
  #iterable: AsyncIterable<T>;
  #fn: (value: T) => boolean;

  constructor(iterable: AsyncIterable<T>, fn: (value: T) => boolean) {
    this.#iterable = iterable;
    this.#fn = fn;
  }

  [Symbol.asyncIterator]() {
    return new TakeWhileAsyncIterator(
      this.#iterable[Symbol.asyncIterator](),
      this.#fn,
    );
  }
}

class TakeWhileAsyncIterator<T> implements AsyncIterator<T> {
  #iterator: AsyncIterator<T>;
  #fn: (value: T) => boolean;
  #done = false;

  constructor(iterator: AsyncIterator<T>, fn: (value: T) => boolean) {
    this.#iterator = iterator;
    this.#fn = fn;
  }

  async next(): Promise<IteratorResult<T>> {
    if (this.#done) return { done: true } as IteratorResult<T>;

    const iteration = await this.#iterator.next();
    if (iteration.done) {
      this.#done = true;
      return iteration;
    }

    const { value } = iteration;
    if (this.#fn(value)) {
      return iteration;
    } else {
      this.#done = true;
      return { done: true } as IteratorResult<T>;
    }
  }
}
