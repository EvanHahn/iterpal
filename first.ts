export default <T>(iterable: Iterable<T>): undefined | T =>
  iterable[Symbol.iterator]().next().value;
