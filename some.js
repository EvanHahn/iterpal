export default function some(iterable, predicate) {
  for (const value of iterable) {
    if (predicate(value)) {
      return true;
    }
  }

  return false;
}
