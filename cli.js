#!/usr/bin/env node
const fn = require('./')
const { execSync } = require('child_process')

function printHelp () {
  console.log('Usage: node ' + process.argv[1] + ' <email@address.domain> [destination]')
  console.log('Or:    covgen <email@address.domain> [destination] (if installed globally)')
}

if (!process.argv.every(val => val.match(/(--help|-h)/) === null)) {
  printHelp()
  process.exit(0)
}

if (process.argv[0] !== 'covgen') {
  process.argv.shift()
}

let email = process.argv[1]
const dest = process.argv[2]

if (email === undefined) {
  try {
    email = execSync('git config --get user.email').toString().trim()
    console.log('No email provided, using the email in your .gitconfig...')
  } catch {
    printHelp()
    process.exit(1)
  }
}

fn(email, dest)
