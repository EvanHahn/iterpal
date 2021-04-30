import time from "./time.js";

const bigArray = Array(5000000).fill(null).map(Math.random);

function noop() {}

time(
  "converting an array of numbers to strings with Array.prototype.map",
  () => {
    for (const value of bigArray.map(String)) {
      noop(value);
    }
  }
);
