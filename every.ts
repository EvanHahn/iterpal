export default function every<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean,
): boolean {
  for (const value of iterable) {
    if (!predicate(value)) return false;
  }
  return true;
}
