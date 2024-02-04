/**
 * Convert an async iterator into an async iterable.
 *
 * Because iterators are not reusable, the resulting async iterable will not be reusable either.
 */
export default async function* asyncIteratorToIterable<T>(
  asyncIterator: AsyncIterator<T>,
): AsyncIterable<T> {
  while (true) {
    const { done, value } = await asyncIterator.next();
    if (done) break;
    yield value;
  }
}
