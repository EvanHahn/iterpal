export default function (iterable) {
  // These are for performance, saving us from having to go through
  // the whole iterable for some common cases.
  if (Array.isArray(iterable) || (typeof iterable === 'string')) {
    return iterable[iterable.length - 1]
  }

  let result
  for (const element of iterable) {
    result = element
  }
  return result
}
