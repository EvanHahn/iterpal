import quickSize from "./_quickSize.ts";

export default function (iterable: Iterable<unknown>): number {
  const quick = quickSize(iterable);
  if (quick !== null) return quick;

  const iterator = iterable[Symbol.iterator]();
  let result = -1;
  for (let isDone: unknown = false; !isDone; result++) {
    isDone = iterator.next().done;
  }
  return result;
}
