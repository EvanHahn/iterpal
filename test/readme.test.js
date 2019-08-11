import test from 'ava'

import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import map from '../map'
import filter from '../filter'
import some from '../some'

const readFileAsync = promisify(fs.readFile)
const readdirAsync = promisify(fs.readdir)

test.before(async (t) => {
  const readmePath = path.join(__dirname, '..', 'README.md')
  const readmeData = await readFileAsync(readmePath, 'utf8')
  t.context.readmeLines = readmeData.split('\n').map(line => line.trim())
})

test.before(async (t) => {
  const projectRootPath = path.join(__dirname, '..')
  const projectRootFiles = await readdirAsync(projectRootPath)
  const projectRootJsFiles = filter(projectRootFiles, filename => (
    path.extname(filename) === '.js'
  ))
  t.context.expectedIdentifiers = map(projectRootJsFiles, filename => (
    path.basename(filename, '.js')
  ))
})

test('documents all functions', t => {
  const summaryLines = filter(t.context.readmeLines, line => (
    /^<summary><code>[^<]+<\/code><\/summary>$/.test(line)
  ))
  const codeInSummary = map(summaryLines, line => (
    /^<summary><code>([^<]+)<\/code><\/summary>$/.exec(line)[1]
  ))

  for (const expectedIdentifier of t.context.expectedIdentifiers) {
    t.assert(
      some(codeInSummary, code => code.includes(expectedIdentifier)),
      `Expected "${expectedIdentifier}" to be documented`
    )
  }
})
