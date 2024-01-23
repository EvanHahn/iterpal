export default function find<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean,
): T | undefined {
  for (const value of iterable) {
    if (predicate(value)) return value;
  }
}
