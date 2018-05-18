const request = require('request-promise')
const fs = require('mz/fs')
const mkdirp = require('mkdirp-promise')
const getDirName = require('path').dirname

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

      await mkdirp(getDirName(dest)).then(async () => {
        fs.writeFile(dest, newContent, 'utf8')
          .catch((err) => console.log('Error writing file:', err))
          .then(() => console.log(`Done! Created file ${dest}.`))
      }).catch(err => {
        console.log('Unable to creat directory for path.', err)
      })
    })
    .catch(error => {
      console.log('Error fetching file:', error)
    })
}
