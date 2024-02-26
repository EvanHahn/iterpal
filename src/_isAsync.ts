/**
 * Is the value an asynchronous iterable?
 */
export default <T>(
  value: Iterable<T> | AsyncIterable<T>,
): value is AsyncIterable<T> =>
  typeof value !== "string" && Symbol.asyncIterator in value;
