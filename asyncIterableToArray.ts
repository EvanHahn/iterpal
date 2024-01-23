export default async <T>(
  asyncIterable: AsyncIterable<T>,
): Promise<Array<T>> => {
  const result = [];
  for await (const value of asyncIterable) {
    result.push(value);
  }
  return result;
};