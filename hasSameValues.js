import quickSize from "./quickSize.js";

export default function hasSameValues(iterableA, iterableB) {
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
}

function countValues(iterable) {
  const result = new Map();
  for (const value of iterable) {
    result.set(value, (result.get(value) || 0) + 1);
  }
  return result;
}
