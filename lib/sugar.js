var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var yaml = require('js-yaml');

module.exports = Sugar;

function Sugar(env) {
  var _this = this;

  this.configPath = env.configPath;
  this.commands = {};

  this.loadConfig(function(tree) {
    _this.buildCommands(tree);
  });
}

Sugar.prototype.loadConfig = function(cb) {
  var tree;

  fs.readFile(this.configPath, process);

  function process(err, data) {
    try {
      tree = yaml.safeLoad(data);
    }
    catch(e) {
      console.log(e);
    }

    cb(tree);
  }
}

Sugar.prototype.buildCommands = function(tree) {
  for (var i in tree) {
    var cmd = tree[i];

    // exec = run other scripts
    if (cmd.exec) {

    }

    // run = single command
    else if (cmd.run) {
      this.commands[i] = this.buildCommand(cmd);
    }

    // multiple keys = multiple commands
    else if (Object.keys(cmd).length > 1) {
      this.commands[i] = this.buildCompositeCommand(cmd);
    }
  }

  console.log(this.commands);
}

Sugar.prototype.buildExec = function(cmd) {
  return function() {

  }
}

Sugar.prototype.buildCommand = function(cmd) {
  var string = cmd.run;
  var opts = [];

  if (cmd.opts) {
    for (var i in cmd.opts) {
      if (i.length === 1) opts.push('-'+i);
      else opts.push('--'+i)

      if (cmd.opts[i] !== true) opts.push(cmd.opts[i]);
    }
  }

  if (string.indexOf('%o') > -1) {
    string = string.replace('%o', opts.join(' '));
  }
  else {
    string += ' ' + opts.join(' ');
  }

  return string;
}

Sugar.prototype.buildCompositeCommand = function(cmds) {
  var string = '', commands = [];

  for (var i in cmds) {
    var cmd = this.buildCommand(cmds[i]);
    commands.push(cmd);
  }

  return commands;
}

Sugar.prototype.execCommand = function(cmd) {
  var command = path.join(process.cwd(), 'node_modules/.bin', cmd[0]);
  var args = cmd.slice(1).split(' ');

  console.log(command);
}
