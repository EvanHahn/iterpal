/**
 * Iterates over `iterable`, returning the first element `predicate(value)` returns truthy for. Returns `undefined` if no value is found.
 *
 * @example
 * ```typescript
 * const isEven = (n) => n % 2 === 0;
 *
 * find(new Set([1, 3, 4, 5]), isEven);
 * // => 4
 *
 * find([1, 3, 5, 7], isEven);
 * // => undefined
 *
 * find([], isEven);
 * // => undefined
 * ```
 */
export default function find<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean,
): T | undefined {
  for (const value of iterable) {
    if (predicate(value)) return value;
  }
}
