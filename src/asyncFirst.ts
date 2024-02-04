/**
 * Resolves with the first value in an async iterable. Resolves with `undefined` if the iterable is empty.
 *
 * @example
 * ```typescript
 * const iterable = asyncify(["a", "b", "c"]);
 * await asyncFirst(iterable);
 * // => "a"
 *
 * await asyncFirst(emptyAsyncIterable);
 * // => undefined
 * ```
 */
export default async function asyncFirst<T>(
  asyncIterable: AsyncIterable<T>,
): Promise<undefined | T> {
  return (await asyncIterable[Symbol.asyncIterator]().next()).value;
}
