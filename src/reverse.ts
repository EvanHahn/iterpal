/**
 * Reverse an iterable.
 *
 * @example
 * ```typescript
 * const myArray = [1, 2, 3];
 *
 * reverse(myArray);
 * // => Iterable yielding 3, 2, 1
 * ```
 */
export default function reverse<T>(iterable: Iterable<T>): Iterable<T> {
  return Array.from(iterable).reverse();
}
