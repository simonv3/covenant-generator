#!/usr/bin/env node
const fn = require('./')

if (process.argv.length < 3 || !process.argv.every(val => val.match(/(--help|-h)/) === null)) {
  console.log('Usage: node ' + process.argv[1] + ' <email@address.domain> [destination]')
  console.log('Or:    covgen <email@address.domain> [destination] (if installed globally)')
  process.exit(1)
}

if (process.argv[0] === 'covgen') {
  fn(process.argv[1], process.argv[2])
} else {
  fn(process.argv[2], process.argv[3])
}
