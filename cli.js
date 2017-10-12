#!/usr/bin/env node
const fn = require('./')

if (process.argv.length < 3 || !process.argv.every(val => val.match(/(--help|-h)/) === null)) {
  console.log('Usage: node ' + process.argv[1] + ' <email@address.domain>')
  console.log('Or:    covgen <email@address.domain> (if installed globally)')
  process.exit(1)
}

fn(process.argv[2])
