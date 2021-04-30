export default function (iterable) {
  return iterable[Symbol.iterator]().next().value;
}
