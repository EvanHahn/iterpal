export default function find<T>(iterable: Iterable<T>): undefined | T {
  return iterable[Symbol.iterator]().next().value;
}
