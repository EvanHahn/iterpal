import isSync from "./_isSync.ts";

/** @ignored */
export default function min<T extends number | bigint>(
  numbers: Iterable<T>,
): undefined | T;

/** @ignored */
export default function min<T extends number | bigint>(
  numbers: AsyncIterable<T>,
): Promise<undefined | T>;

/**
 * Returns the smallest number in the iterable `numbers`. Returns `undefined` if `numbers` is an empty iterable. `numbers` can contain numbers or bigints.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 *
 * @example
 * ```typescript
 * min(new Set([9, 3, 1]));
 * // => 1
 *
 * min([-Infinity, 1, 2]);
 * // => -Infinity
 * ```
 */
export default function min<T extends number | bigint>(
  numbers: Iterable<T> | AsyncIterable<T>,
): undefined | T | Promise<undefined | T> {
  return isSync(numbers) ? minSync(numbers) : minAsync(numbers);
}

function minSync<T extends number | bigint>(
  numbers: Iterable<T>,
): undefined | T {
  let result: undefined | T;
  for (const number of numbers) {
    if (result === undefined || result > number) {
      result = number;
    }
  }
  return result;
}

async function minAsync<T extends number | bigint>(
  numbers: AsyncIterable<T>,
): Promise<undefined | T> {
  let result: undefined | T;
  for await (const number of numbers) {
    if (result === undefined || result > number) {
      result = number;
    }
  }
  return result;
}
