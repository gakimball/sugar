#!/usr/bin/env node

var Liftoff = require('liftoff');
var Sugar = require('../index');
var yargs = require('yargs').argv;

var app = new Liftoff({
  processTitle: 'sugar',
  moduleName: 'sugar',
  configName: 'Sugar',
  extensions: { '.yml': null }
});

app.launch({}, function(env) {
  var s = new Sugar(env);
});
