/**
 * Returns `true` if `iterable` has no elements, and `false` otherwise.
 *
 * @example
 * ```typescript
 * isEmpty(new Set());
 * // => true
 *
 * isEmpty([1, 2, 3]);
 * // => false
 * ```
 */
export default function isEmpty(iterable: Iterable<unknown>): boolean {
  return Boolean(iterable[Symbol.iterator]().next().done);
}
