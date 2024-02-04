/**
 * Returns the nth element from an iterable. Returns `undefined` if the index is out of range.
 *
 * @example
 * ```typescript
 * at(new Set(["hello", "world"]), 0);
 * // => "hello"
 *
 * at(["hello", "world"], 1);
 * // => "world"
 *
 * at(new Set(["hello", "world"]), 2);
 * // => undefined
 * ```
 */
export default function at<T>(
  iterable: Iterable<T>,
  desiredIndex: number,
): undefined | T {
  const iterator = iterable[Symbol.iterator]();

  for (let i = 0; i <= desiredIndex; i++) {
    const iteration = iterator.next();
    if (i === desiredIndex) {
      return iteration.value;
    } else if (iteration.done) {
      break;
    }
  }

  return;
}
