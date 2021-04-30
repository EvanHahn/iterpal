import time from "./time.js";

const bigArray = Array(5000000).fill(null).map(Math.random);

function noop() {}

time("reading the first 100 elements from a natively-mapped array", () => {
  let count = 0;
  for (const value of bigArray.map(String)) {
    noop(value);
    count++;
    if (count === 100) {
      return;
    }
  }
});
