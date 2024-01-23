import map from "../map.ts";

const bigArray = Array(1_000_000)
  .fill(null)
  .map(() => ({
    a: Math.random(),
    b: Math.random(),
  }));

Deno.bench("iterpal reduce key by", () => {
  Object.fromEntries(map(bigArray, (obj) => [obj.a, obj]));
});

Deno.bench("native loop key by", () => {
  const result = {};
  for (const obj of bigArray) {
    result[obj.a] = obj;
  }
  return result;
});
