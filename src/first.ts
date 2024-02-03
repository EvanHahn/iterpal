/**
 * Returns the first value in an iterable. Returns `undefined` if the iterable is empty.
 *
 * @example
 * ```typescript
 * first(new Set(["hello", "world"]));
 * // => "hello"
 *
 * first([10, 11, 12]);
 * // => 10
 *
 * first(new Map());
 * // => undefined
 * ```
 */
export default function find<T>(iterable: Iterable<T>): undefined | T {
  return iterable[Symbol.iterator]().next().value;
}
