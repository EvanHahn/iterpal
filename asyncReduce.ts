export default async function asyncReduce<T, U>(
  asyncIterable: AsyncIterable<T>,
  fn: (previousValue: U, currentValue: T) => U | Promise<U>,
  accumulator: U,
) {
  let result = accumulator;
  for await (const value of asyncIterable) {
    result = await fn(result, value);
  }
  return result;
}
