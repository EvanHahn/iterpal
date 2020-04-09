export default function every (iterable, predicate) {
  for (const value of iterable) {
    if (!predicate(value)) {
      return false
    }
  }

  return true
}
