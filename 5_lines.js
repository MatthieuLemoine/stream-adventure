'use strict';
let through2 = require('through2');
let split    = require('split');

let shouldUpper = false;
process.stdin
  .pipe(split())
  .pipe(through2(function(line,enc,next){
    let out = line.toString();
    if(shouldUpper){
      out = out.toUpperCase();
    }
    else{
      out = out.toLowerCase();
    }
    shouldUpper = !shouldUpper;
    this.push(out+'\n');
    next();
  }))
  .pipe(process.stdout);
