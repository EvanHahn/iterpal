/**
 * Returns true if at least one element matches the predicate, and false otherwise. Similar to [Array.prototype.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some). Returns false for empty iterables.
 *
 * @example
 * ```typescript
 * function isEven(n) {
 *   return n % 2 === 0;
 * }
 *
 * const mySet = new Set([1, 2, 3]);
 * some(mySet, isEven);
 * // => true
 *
 * some([1, 3, 5], isEven);
 * // => false
 *
 * some([], () => true);
 * // => false
 * ```
 */
export default function some<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean,
): boolean {
  for (const value of iterable) {
    if (predicate(value)) return true;
  }
  return false;
}
