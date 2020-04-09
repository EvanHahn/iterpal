export default function time (name, fn) {
  process.stdout.write(name)
  process.stdout.write('...')

  const start = process.hrtime.bigint()
  fn()
  const finish = process.hrtime.bigint()

  const ms = (finish - start) / BigInt(1000000)

  process.stdout.write(`completed in ${ms}ms\n`)
}
