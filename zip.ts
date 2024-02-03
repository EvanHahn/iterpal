import map from "./map.ts";

export default zip;

/** @ignored */
function zip(): Iterable<[]>;
/** @ignored */
function zip<A>(a: Iterable<A>): Iterable<[A]>;
/** @ignored */
function zip<A, B>(a: Iterable<A>, b: Iterable<B>): Iterable<[A, B]>;
/** @ignored */
function zip<A, B, C>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
): Iterable<[A, B, C]>;
/** @ignored */
function zip<A, B, C, D>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>,
): Iterable<[A, B, C, D]>;
/** @ignored */
function zip<A, B, C, D, E>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>,
  e: Iterable<E>,
): Iterable<[A, B, C, D, E]>;

/**
 * Returns an iterable of arrays. The first array contains the first elements of each of the input iterables, the second contains the second elements of each input iterable, and so on. Useful when constructing `Map`s.
 *
 * Stops when the shortest iterable ends.
 *
 * @example
 * ```typescript
 * const colors = ["red", "green", "blue"];
 * const scores = [5, 9, 2];
 * zip([colors, scores]);
 * // => Iterable yielding ["red", 5], ["green", 9], ["blue", 2]
 *
 * new Map(zip([colors, scores]));
 * // => Map { "red" => 5, "green" => 9, "blue" => 2 }
 *
 * const amounts = [99, 98];
 * zip([colors, scores, amounts]);
 * // => Iterable yielding ["red", 5, 99], ["green", 9, 98]
 * ```
 */
function* zip<T>(
  ...iterables: Array<Iterable<T>>
): Iterable<Array<T>> {
  const iterators = [
    ...map(iterables, (iterable) => iterable[Symbol.iterator]()),
  ];

  while (true) {
    const nextValues: Array<T> = [];

    for (const iterator of iterators) {
      const iteratorResult = iterator.next();
      if (iteratorResult.done) return;
      nextValues.push(iteratorResult.value);
    }

    if (nextValues.length === 0) return;

    yield nextValues;
  }
}
