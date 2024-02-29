import isSync from "./_isSync.ts";

export default uniq;

/** @ignored */
function uniq<T>(iterable: Iterable<T>): Iterable<T>;

/** @ignored */
function uniq<T>(iterable: AsyncIterable<T>): AsyncIterable<T>;

/**
 * Return an iterable where duplicates are dropped. Equality is determined with `Object.is`.
 *
 * Works with sync or async iterables. If passed an async iterable, the result of `fn` will be awaited.
 *
 * @example
 * ```typescript
 * uniq([1, 2, 3, 1, 2, 3, 4, 5])
 * // => Iterable yielding 1, 2, 3, 4, 5
 * ```
 */
function uniq<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): Iterable<T> | AsyncIterable<T> {
  return isSync(iterable)
    ? new UniqIterable(iterable)
    : new UniqAsyncIterable(iterable);
}

class UniqIterable<T> implements Iterable<T> {
  #iterable: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this.#iterable = iterable;
  }

  [Symbol.iterator]() {
    return new UniqIterator(this.#iterable);
  }
}

class UniqIterator<T> implements Iterator<T> {
  #iterator: Iterator<T>;
  #seen = new Set<T>();

  constructor(iterable: Iterable<T>) {
    this.#iterator = iterable[Symbol.iterator]();
  }

  next(): IteratorResult<T> {
    while (true) {
      const iteration = this.#iterator.next();
      if (iteration.done) return iteration;

      if (this.#seen.has(iteration.value)) continue;
      this.#seen.add(iteration.value);
      return iteration;
    }
  }
}

class UniqAsyncIterable<T> implements AsyncIterable<T> {
  #iterable: AsyncIterable<T>;

  constructor(iterable: AsyncIterable<T>) {
    this.#iterable = iterable;
  }

  [Symbol.asyncIterator]() {
    return new UniqAsyncIterator(this.#iterable);
  }
}

class UniqAsyncIterator<T> implements AsyncIterator<T> {
  #iterator: AsyncIterator<T>;
  #seen = new Set<T>();

  constructor(iterable: AsyncIterable<T>) {
    this.#iterator = iterable[Symbol.asyncIterator]();
  }

  async next(): Promise<IteratorResult<T>> {
    while (true) {
      const iteration = await this.#iterator.next();
      if (iteration.done) return iteration;

      if (this.#seen.has(iteration.value)) continue;
      this.#seen.add(iteration.value);
      return iteration;
    }
  }
}
