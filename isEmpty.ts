export default function isEmpty(iterable: Iterable<unknown>): boolean {
  return Boolean(iterable[Symbol.iterator]().next().done);
}
