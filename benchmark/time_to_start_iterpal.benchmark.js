import time from "./time.js";

import map from "../map.js";

const bigArray = Array(5000000).fill(null).map(Math.random);

time("starting to read the first element from an iterpal-mapped array", () => {
  // This unreachable loop is deliberate.
  // eslint-disable-next-line no-unreachable-loop
  for (const value of map(bigArray, String)) {
    return value;
  }
});
