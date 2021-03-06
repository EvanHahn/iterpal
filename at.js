export default function at(iterable, desiredIndex) {
  const iterator = iterable[Symbol.iterator]();

  for (let i = 0; i <= desiredIndex; i++) {
    const iteration = iterator.next();
    if (i === desiredIndex) {
      return iteration.value;
    } else if (iteration.done) {
      break;
    }
  }

  return undefined;
}
