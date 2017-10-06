const test = require('ava').test
const fn = require('../covenant.js')
const fs = require('mz/fs')
const path = require('path')

test.after('cleanup', t => {
  fs.unlink(path.join(__dirname, 'fixtures/RES.md'))
})

test('throws if no email provided', async t => {
  const error = await t.throws(fn())
  t.is(error.message, 'An email address must be provided!')
})

test('will create file', async t => {
  const dest = path.join(__dirname, 'fixtures/RES.md')
  await fn('test@example.com', dest)
  await fs.readFile(path.join(__dirname, 'fixtures/CODE_OF_CONDUCT.md'), 'utf8')
    .then(async (fixture) => {
      await fs.readFile(path.join(__dirname, 'fixtures/RES.md'), 'utf8')
        .then(newfile => {
          t.is(fixture, newfile)
        })
    })
})
