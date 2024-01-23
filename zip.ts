import map from "./map.ts";

export default zip;

function zip(): Iterable<[]>;
function zip<A>(a: Iterable<A>): Iterable<[A]>;
function zip<A, B>(a: Iterable<A>, b: Iterable<B>): Iterable<[A, B]>;
function zip<A, B, C>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
): Iterable<[A, B, C]>;
function zip<A, B, C, D>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>,
): Iterable<[A, B, C, D]>;
function zip<A, B, C, D, E>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>,
  e: Iterable<E>,
): Iterable<[A, B, C, D, E]>;

function* zip<A, B, C, D, E>(
  _a?: Iterable<A>,
  _b?: Iterable<B>,
  _c?: Iterable<C>,
  _d?: Iterable<D>,
  _e?: Iterable<E>,
): Iterable<Array<A | B | C | D | E>> {
  const iterators = [
    ...map(arguments, (iterable) => iterable[Symbol.iterator]()),
  ];

  while (true) {
    const nextValues: Array<A | B | C | D | E> = [];

    for (const iterator of iterators) {
      const iteratorResult = iterator.next();
      if (iteratorResult.done) return;
      nextValues.push(iteratorResult.value);
    }

    if (nextValues.length === 0) return;

    yield nextValues;
  }
}
