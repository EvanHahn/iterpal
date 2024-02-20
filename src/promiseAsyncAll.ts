/**
 * Like `Promise.all`, but works with async iterables as well.
 *
 * If a sync iterable is provided, `Promise.all` will be used under the hood.
 */
export default function promiseAsyncAll<T>(
  iterable: Iterable<T | PromiseLike<T>> | AsyncIterable<T | PromiseLike<T>>,
): Promise<Array<T>> {
  return Symbol.iterator in iterable
    ? Promise.all(iterable)
    : asyncAll(iterable);
}

async function asyncAll<T>(
  iterable: AsyncIterable<T | PromiseLike<T>>,
): Promise<Array<T>> {
  const result: Array<T> = [];

  for await (const value of iterable) {
    result.push(await value);
  }

  return result;
}
