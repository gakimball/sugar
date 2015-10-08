var assert = require('assert');
var exec = require('child_process').execFile;
var mocha = require('mocha');
var path = require('path');
var Sugar = require('../index');

describe('Sugar', function(done) {
  it('converts a YAML config file into a series of tasks', function(done) {
    var file = path.join(process.cwd(), 'bin/sugar.js');
    var cwd = path.join(process.cwd(), 'test/fixtures/');

    exec(file, { cwd: cwd }, function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      done();
    });
  });
});
