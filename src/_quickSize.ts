import isArrayOrTypedArray from "./_isArrayOrTypedArray.ts";

const getLength = (value: Readonly<unknown>): null | number =>
  isArrayOrTypedArray(value) ? value.length : null;

const getSize = (value: Readonly<unknown>): null | number =>
  value instanceof Set || value instanceof Map ? value.size : null;

export default (iterable: Readonly<unknown>): null | number =>
  getLength(iterable) ?? getSize(iterable) ?? null;
