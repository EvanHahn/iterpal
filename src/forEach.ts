import isSync from "./_isSync.ts";

export default forEach;

/** @ignored */
function forEach<T>(iterable: Iterable<T>, fn: (value: T) => unknown): void;

/** @ignored */
function forEach<T>(
  iterable: AsyncIterable<T>,
  fn: (value: T) => unknown | Promise<unknown>,
): Promise<void>;

/**
 * Iterate over `iterable`, calling `fn` for each element.
 *
 * Similar to `Array.prototype.forEach`.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 */
function forEach<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T) => unknown | Promise<unknown>,
): void | Promise<void> {
  return isSync(iterable)
    ? forEachSync(iterable, fn)
    : forEachAsync(iterable, fn);
}

function forEachSync<T>(
  iterable: Iterable<T>,
  fn: (value: T) => unknown,
): void {
  for (const value of iterable) fn(value);
}

async function forEachAsync<T>(
  iterable: AsyncIterable<T>,
  fn: (value: T) => unknown | Promise<unknown>,
): Promise<void> {
  for await (const value of iterable) await fn(value);
}
