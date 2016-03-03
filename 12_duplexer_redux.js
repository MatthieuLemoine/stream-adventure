'use strict';
let duplexer = require('duplexer2');
let through2 = require('through2');
let counts   = {};

module.exports = function (counter){
  let counts   = {};
  let writable = through2.obj(write,end);
  return duplexer({objectMode:true},writable,counter);
  function write(obj,encoding,next){
    counts[obj.country] = (counts[obj.country] || 0) + 1;
    next();
  }

  function end(done){
    counter.setCounts(counts);
    done();
  }
}
