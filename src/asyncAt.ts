/**
 * Resolves with the nth element from an iterable. Resolves with `undefined` if the index is out of range.
 *
 * Accepts sync or async iterables.
 *
 * @example
 * ```typescript
 * const iterable = asyncify(["a", "b", "c"]);
 *
 * await asyncAt(iterable, 1);
 * // => "b"
 *
 * await asyncAt(iterable, 999);
 * // => undefined
 * ```
 */
export default async function asyncAt<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  desiredIndex: number,
): Promise<undefined | T> {
  const iterator = Symbol.asyncIterator in iterable
    ? iterable[Symbol.asyncIterator]()
    : iterable[Symbol.iterator]();

  for (let i = 0; i <= desiredIndex; i++) {
    const iteration = await iterator.next();
    if (i === desiredIndex) {
      return iteration.value;
    } else if (iteration.done) {
      break;
    }
  }

  return;
}
