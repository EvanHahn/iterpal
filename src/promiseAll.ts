import isSync from "./_isSync.ts";
import asyncIterableToArray from "./asyncIterableToArray.ts";

/**
 * Like `Promise.all`, but works with async iterables as well.
 *
 * If a sync iterable is provided, `Promise.all` will be used under the hood.
 */
export default function promiseAll<T>(
  iterable: Iterable<T | PromiseLike<T>> | AsyncIterable<T | PromiseLike<T>>,
): Promise<Array<T>> {
  return isSync(iterable) ? Promise.all(iterable) : asyncAll(iterable);
}

async function asyncAll<T>(
  iterable: AsyncIterable<T | PromiseLike<T>>,
): Promise<Array<T>> {
  return Promise.all(await asyncIterableToArray(iterable));
}
