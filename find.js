export default function find (iterable, predicate) {
  for (const value of iterable) {
    if (predicate(value)) {
      return value
    }
  }
}
