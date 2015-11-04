#!/usr/bin/env node

'use strict';

var http = require('http'),
    fs   = require('fs');

var url = "http://contributor-covenant.org/version/1/3/0/code_of_conduct.md";
var dest = "CODE_OF_CONDUCT.md";

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' <email@address.domain>');
  process.exit(1);
}

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) {
    fs.unlink(dest);
    if (cb) cb(err.message);
  });
};

var replaceEmail = function() {
  fs.readFile(dest, 'utf8', function(err, data) {
    if (err) console.log(err);

    var newContent = data.replace('[INSERT EMAIL ADDRESS]', process.argv[2]);
    fs.writeFile(dest, newContent, 'utf8', function(err, data) {
      if (err) console.log(err);
    });
  });
};

download(url, dest, replaceEmail);
