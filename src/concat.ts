import isSync from "./_isSync.ts";

/** @ignored */
export default function concat<T>(
  ...iterables: ReadonlyArray<Iterable<T>>
): Iterable<T>;

/** @ignored */
export default function concat<T>(
  ...iterables: ReadonlyArray<Iterable<T> | AsyncIterable<T>>
): AsyncIterable<T>;

/**
 * Concatenate multiple iterables into one.
 *
 * If any of the iterables are async, the result will be async. Otherwise, a sync iterable will be returned.
 *
 * @example
 * ```typescript
 * const myArray = [1, 2, 3];
 * const mySet = new Set([4, 5, 6]);
 *
 * concat(myArray, mySet);
 * // => Iterable yielding 1, 2, 3, 4, 5, 6
 * ```
 */
export default function concat<T>(
  ...iterables: ReadonlyArray<Iterable<T> | AsyncIterable<T>>
): Iterable<T> | AsyncIterable<T> {
  return iterables.every(isSync)
    ? new ConcatIterable(iterables)
    : new ConcatAsyncIterable(iterables);
}

class ConcatIterable<T> implements Iterable<T> {
  #iterables: ReadonlyArray<Iterable<T>>;

  constructor(iterables: ReadonlyArray<Iterable<T>>) {
    this.#iterables = iterables;
  }

  *[Symbol.iterator]() {
    for (const iterable of this.#iterables) yield* iterable;
  }
}

class ConcatAsyncIterable<T> implements AsyncIterable<T> {
  #iterables: ReadonlyArray<Iterable<T> | AsyncIterable<T>>;

  constructor(iterables: ReadonlyArray<Iterable<T> | AsyncIterable<T>>) {
    this.#iterables = iterables;
  }

  async *[Symbol.asyncIterator]() {
    for (const iterable of this.#iterables) yield* iterable;
  }
}
