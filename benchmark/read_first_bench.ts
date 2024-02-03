import { map } from "../mod.ts";
import { noop } from "./helpers.ts";

const bigArray = Array(1_000_000).fill(null).map(Math.random);

Deno.bench("iterpal read first", () => {
  for (const value of map(bigArray, String)) {
    noop(value);
    break;
  }
});

Deno.bench("native read first", () => {
  for (const value of bigArray.map(String)) {
    noop(value);
    break;
  }
});

Deno.bench("iterpal read first 100", () => {
  let count = 0;
  for (const value of map(bigArray, String)) {
    count++;
    if (count === 100) break;
    noop(value);
  }
});

Deno.bench("native read first 100", () => {
  let count = 0;
  for (const value of bigArray.map(String)) {
    count++;
    if (count === 100) break;
    noop(value);
  }
});
