import time from "./time.js";

const bigArray = Array(5000000).fill(null).map(Math.random);

time("starting to read the first element from a natively-mapped array", () => {
  // This unreachable loop is deliberate.
  // eslint-disable-next-line no-unreachable-loop
  for (const value of bigArray.map(String)) {
    return value;
  }
});
