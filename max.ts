export default function max<T extends number | bigint>(
  numbers: Iterable<T>,
): undefined | T {
  let result: undefined | T;
  for (const number of numbers) {
    if (result === undefined || result < number) {
      result = number;
    }
  }
  return result;
}
