#!/usr/bin/env node
const request = require('request-promise')
const fs = require('mz/fs')

module.exports = async function download (email, dest) {
  if (!email) {
    throw new Error('An email address must be provided!')
  }

  var url = 'https://www.contributor-covenant.org/version/1/4/code-of-conduct.md'
  dest = dest || 'CODE_OF_CONDUCT.md'

  console.log('Downloading Contributors Covenant...')

  await request(url)
    .then(async res => {
      console.log('Replacing e-mail address...')
      var newContent = res.replace('[INSERT EMAIL ADDRESS]', email)

      await fs.writeFile(dest, newContent, 'utf8')
        .catch((err) => console.log('Error writing file:', err))
        .then(() => console.log('Done!'))
    })
    .catch(error => {
      console.log('Error fetching file:', error)
    })
}
