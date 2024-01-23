import map from "./map.ts";
import first from "./first.ts";
import drop from "./drop.ts";

export default function zip(iterables) {
  const iterable0 = first(iterables);
  // TODO: Can we avoid realizing this?
  const restOfIterators = [
    ...drop(
      map(iterables, (iterator) => iterator[Symbol.iterator]()),
      1,
    ),
  ];

  return map(iterable0, (value0) => {
    return [
      value0,
      ...map(restOfIterators, (iterator) => iterator.next().value),
    ];
  });
}
