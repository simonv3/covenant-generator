#!/usr/bin/env node

'use strict';

var http = require('http'),
    request = require('request'),
    fs = require('fs');

var url = 'http://contributor-covenant.org/version/1/3/0/code_of_conduct.md';
var dest = 'CODE_OF_CONDUCT.md';

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' <email@address.domain>');
  console.log('Or:    covgen <email@address.domain> (if installed globally)');
  process.exit(1);
}

var download = function(url, dest) {
  console.log('Downloading Contributors Covenant...');

  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Replacing e-mail address...');

      var newContent = body.replace('[INSERT EMAIL ADDRESS]', process.argv[2]);
      fs.writeFile(dest, newContent, 'utf8', function(err) {
        if (err) {
          console.log('Error writing file:', err);
        }
        else {
          console.log('Done!');
        }
      });
    } else {
      console.log('Error fetching file:', error);
    }
  });
};

download(url, dest);
