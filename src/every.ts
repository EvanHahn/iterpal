/**
 * Returns `true` if `predicate(value)` returns true for every value in `iterable`, and false otherwise. Returns `true` for an empty iterable.
 *
 * @example
 * ```typescript
 * const isEven = (n) => n % 2 === 0;
 *
 * const mySet = new Set([2, 4, 6, 8]);
 * every(mySet, isEven);
 * // => true
 *
 * every([2, 3, 4], isEven);
 * // => false
 *
 * every([], () => false);
 * // => true
 * ```
 */
export default function every<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean,
): boolean {
  for (const value of iterable) {
    if (!predicate(value)) return false;
  }
  return true;
}
