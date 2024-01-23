export default <T>(iterable: Iterable<T>, separator = ","): string => {
  let hasPlacedFirstElement = false;
  let result = "";

  for (const value of iterable) {
    const stringified = value == null ? "" : String(value);
    if (hasPlacedFirstElement) {
      result += separator + stringified;
    } else {
      result += stringified;
      hasPlacedFirstElement = true;
    }
  }

  return result;
};
