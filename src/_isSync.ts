/**
 * Is the value a synchronous iterable?
 */
export default <T>(
  value: Iterable<T> | AsyncIterable<T>,
): value is Iterable<T> =>
  typeof value === "string" || Symbol.iterator in value;
