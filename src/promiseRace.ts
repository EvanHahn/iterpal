import isSync from "./_isSync.ts";
import arrayFrom from "./arrayFrom.ts";

/**
 * Like `Promise.race`, but works with async iterables as well.
 *
 * If a sync iterable is provided, `Promise.race` will be used under the hood.
 */
export default function promiseRace<T>(
  iterable: Iterable<T | PromiseLike<T>> | AsyncIterable<T | PromiseLike<T>>,
): Promise<T> {
  return isSync(iterable) ? Promise.race(iterable) : promiseRaceAsync(iterable);
}

async function promiseRaceAsync<T>(
  iterable: AsyncIterable<T | PromiseLike<T>>,
): Promise<T> {
  return Promise.race(await arrayFrom(iterable));
}
