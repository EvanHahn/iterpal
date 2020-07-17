export default function quickSize (iterable) {
  if (hasLength(iterable)) {
    return iterable.length
  } else if (hasSize(iterable)) {
    return iterable.size
  } else if (iterable instanceof ArrayBuffer) {
    return iterable.byteLength
  } else {
    return null
  }
}

function hasLength (value) {
  return (
    Array.isArray(value) ||
    (typeof value === 'string') ||
    ArrayBuffer.isView(value)
  )
}

function hasSize (value) {
  return (
    (value instanceof Set) ||
    (value instanceof Map)
  )
}
