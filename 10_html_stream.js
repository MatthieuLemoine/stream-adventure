'use strict';
let trumpet  = require('trumpet');
let through2 = require('through2');
let tr       = trumpet();
let loud     = tr.select('.loud').createStream();

loud
  .pipe(through2((buffer,encoding,next) => {
    next(null,buffer.toString().toUpperCase());
  }))
  .pipe(loud);

process.stdin
  .pipe(tr)
  .pipe(process.stdout);
