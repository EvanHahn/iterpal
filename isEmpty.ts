export default (iterable: Iterable<unknown>): boolean =>
  Boolean(iterable[Symbol.iterator]().next().done);
