import map from "../map.ts";
import { noop } from "./helpers.ts";

const bigArray = Array(1_000_000).fill(null).map(Math.random);

Deno.bench("iterpal map", () => {
  for (const value of map(bigArray, String)) {
    noop(value);
  }
});

Deno.bench("native map", () => {
  for (const value of bigArray.map(String)) {
    noop(value);
  }
});
