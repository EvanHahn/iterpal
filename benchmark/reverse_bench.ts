import { reverse } from "../mod.ts";

const SIZE = 1_000_000;
const bigUint16Array = new Uint16Array(SIZE);
const bigFloat64Array = new Float64Array(SIZE);
for (let i = 0; i < SIZE; i++) {
  bigUint16Array[i] = Math.floor(Math.random() * (2 ** 16));
  bigFloat64Array[i] = Math.random();
}
const bigArray = Array.from(bigFloat64Array);

Deno.bench("reversing a big array", () => {
  Array.from(reverse(bigArray));
});

Deno.bench("reversing a big Uint16Array", () => {
  new Uint16Array(reverse(bigUint16Array));
});

Deno.bench("reversing a big Float64Array", () => {
  new Float64Array(reverse(bigFloat64Array));
});

Deno.bench("natively reversing a big array", () => {
  bigArray.concat().reverse();
});

Deno.bench("natively reversing a big Uint16Array", () => {
  bigUint16Array.slice().reverse();
});

Deno.bench("natively reversing a big Float64Array", () => {
  bigFloat64Array.slice().reverse();
});
