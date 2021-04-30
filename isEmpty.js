export default function (iterable) {
  return iterable[Symbol.iterator]().next().done;
}
