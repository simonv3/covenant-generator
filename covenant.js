#!/usr/bin/env node

'use strict';

var http = require('http'),
    fs   = require('fs');

var file = fs.createWriteStream("CODE_OF_CONDUCT.md");
var request = http.get("http://contributor-covenant.org/version/1/3/0/code_of_conduct.md", function(response) {
  response.pipe(file);
});
