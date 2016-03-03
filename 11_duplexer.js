'use strict';
let duplexer = require('duplexer2');
let spawn    = require('child_process').spawn;

module.exports = (cmd,args) => {
  const child = spawn(cmd,args);
  return duplexer(child.stdin,child.stdout);
};
