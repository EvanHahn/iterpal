import isSync from "./_isSync.ts";

/** @ignored */
export default function max<T extends number | bigint>(
  numbers: Iterable<T>,
): undefined | T;

/** @ignored */
export default function max<T extends number | bigint>(
  numbers: AsyncIterable<T>,
): Promise<undefined | T>;

/**
 * Returns the largest number in the iterable `numbers`. Returns `undefined` if `numbers` is an empty iterable. `numbers` can contain numbers or bigints.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 *
 * @example
 * ```typescript
 * max(new Set([9, 3, 1]));
 * // => 9
 *
 * max([Infinity, 1, 2]);
 * // => Infinity
 * ```
 */
export default function max<T extends number | bigint>(
  numbers: Iterable<T> | AsyncIterable<T>,
): undefined | T | Promise<undefined | T> {
  return isSync(numbers) ? maxSync(numbers) : maxAsync(numbers);
}

function maxSync<T extends number | bigint>(
  numbers: Iterable<T>,
): undefined | T {
  let result: undefined | T;
  for (const number of numbers) {
    if (result === undefined || result < number) {
      result = number;
    }
  }
  return result;
}

async function maxAsync<T extends number | bigint>(
  numbers: AsyncIterable<T>,
): Promise<undefined | T> {
  let result: undefined | T;
  for await (const number of numbers) {
    if (result === undefined || result < number) {
      result = number;
    }
  }
  return result;
}
