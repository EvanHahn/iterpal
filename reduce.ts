export default <T, U>(
  iterable: Iterable<T>,
  fn: (previousValue: U, currentValue: T) => U,
  accumulator: U,
) => {
  let result = accumulator;
  for (const value of iterable) {
    result = fn(result, value);
  }
  return result;
};
