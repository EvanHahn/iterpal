export default function some<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean,
): boolean {
  for (const value of iterable) {
    if (predicate(value)) return true;
  }
  return false;
}
