import quickSize from "./quickSize.js";

const countValues = <T>(iterable: Iterable<T>): Map<T, number> => {
  const result = new Map<T, number>();
  for (const value of iterable) {
    result.set(value, (result.get(value) || 0) + 1);
  }
  return result;
};

export default <T>(iterableA: Iterable<T>, iterableB: Iterable<T>): boolean => {
  const aSize = quickSize(iterableA);
  const bSize = quickSize(iterableB);
  if (aSize !== null && bSize !== null && aSize !== bSize) {
    return false;
  }

  const countsByValueA = countValues(iterableA);
  const countsByValueB = countValues(iterableB);

  if (countsByValueA.size !== countsByValueB.size) {
    return false;
  }

  for (const [value, expectedCount] of countsByValueA) {
    if (countsByValueB.get(value) !== expectedCount) {
      return false;
    }
  }

  return true;
};
