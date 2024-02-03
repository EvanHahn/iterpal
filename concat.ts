/**
 * Concatenate multiple iterables into one.
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
  ...iterables: ReadonlyArray<Iterable<T>>
): Iterable<T> {
  return new ConcatIterable(iterables);
}

class ConcatIterable<T> implements Iterable<T> {
  #iterables: ReadonlyArray<Iterable<T>>;

  constructor(iterables: ReadonlyArray<Iterable<T>>) {
    this.#iterables = iterables;
  }

  *[Symbol.iterator]() {
    for (const iterable of this.#iterables) {
      yield* iterable;
    }
  }
}
