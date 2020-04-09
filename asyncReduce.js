export default async function asyncReduce (asyncIterable, fn, accumulator) {
  let result = accumulator
  for await (const value of asyncIterable) {
    result = await fn(result, value)
  }
  return result
}
