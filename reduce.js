export default function reduce(iterable, fn, accumulator) {
  let result = accumulator;
  for (const value of iterable) {
    result = fn(result, value);
  }
  return result;
}
