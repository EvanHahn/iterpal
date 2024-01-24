/**
 * Iterates over `iterable`, returning the final value. Returns `undefined` if the iterable is empty.
 *
 * Has optimizations for some types, such as arrays, to avoid iterating over the whole argument.
 *
 * @example
 * ```typescript
 * last(new Set(["hello", "world"]));
 * // => "world"
 *
 * last([10, 11, 12]);
 * // => 12
 * ```
 */
export default function last<T>(iterable: Iterable<T>): undefined | T {
  // These are for performance, saving us from having to go through
  // the whole iterable for some common cases.
  if (Array.isArray(iterable) || typeof iterable === "string") {
    return iterable[iterable.length - 1];
  }

  let result: undefined | T;
  for (const element of iterable) {
    result = element;
  }
  return result;
}
