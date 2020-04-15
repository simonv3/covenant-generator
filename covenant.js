const bent = require('bent')
const fs = require('mz/fs')
const mkdirp = require('mkdirp')
const getDirName = require('path').dirname

async function writeFile (dest, content) {
  await mkdirp(getDirName(dest)).then(async () => {
    fs.writeFile(dest, content, 'utf8')
      .catch((err) => console.log('Error writing file:', err))
      .then(() => console.log(`Done! Created file ${dest}.`))
  }).catch(err => {
    console.log('Unable to creat directory for path.', err)
  })
}

module.exports = async function download (email, dest) {
  if (!email) {
    throw new Error('An email address must be provided!')
  }

  var url = 'https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md'
  dest = dest || 'CODE_OF_CONDUCT.md'

  console.log('Downloading Contributors Covenant...')

  const getString = bent('string')
  const coc = await getString(url)
  console.log('Replacing e-mail address...')
  var content = coc.replace('[INSERT CONTACT METHOD]', email)

  if (dest.split(',').length > 1) {
    let destinations = dest.split(',')
    for (var i = 0; i < destinations.length; i++) {
      await writeFile(destinations[i], content)
    }
  } else {
    await writeFile(dest, content)
  }
}
