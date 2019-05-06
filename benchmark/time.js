module.exports = function time (name, fn) {
  process.stdout.write(name)
  process.stdout.write('...')

  const heapUsedAtStart = process.memoryUsage().heapUsed
  const start = process.hrtime.bigint()
  fn()
  const heapUsedAtFinish = process.memoryUsage().heapUsed
  const finish = process.hrtime.bigint()

  const heapUsedMb = ((heapUsedAtFinish - heapUsedAtStart) / 1024 / 1024).toFixed(1)
  const ms = (finish - start) / BigInt(1000000)

  process.stdout.write(`completed in ${ms}ms, used ${heapUsedMb}MB of heap\n`)
}
