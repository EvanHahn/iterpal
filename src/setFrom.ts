import isSync from "./_isSync.ts";

export default setFrom;

/** @ignored */
function setFrom<T>(iterable: Iterable<T>): Set<T>;

/** @ignored */
function setFrom<T>(
  iterable: AsyncIterable<T>,
): Promise<Set<T>>;

/**
 * Convert an iterable to a `Set`.
 *
 * If passed a sync iterable, returns a `Set`. If passed an async iterable, returns a Promise that resolves to a set.
 *
 * @example
 * ```typescript
 * const set = setFrom([1, 2, 3]);
 * // => Set() { 1, 2, 3 }
 * ```
 */
function setFrom<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): Set<T> | Promise<Set<T>> {
  return isSync(iterable) ? new Set(iterable) : setFromAsync(iterable);
}

async function setFromAsync<T>(
  iterable: AsyncIterable<T>,
): Promise<Set<T>> {
  const result = new Set<T>();
  for await (const value of iterable) result.add(value);
  return result;
}
