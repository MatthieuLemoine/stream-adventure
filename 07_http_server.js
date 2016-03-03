'use strict';
let http     = require('http');
let through2 = require('through2');

http
  .createServer((req,res)=>{
    req
      .pipe(through2(upper))
      .pipe(res);
  })
  .listen(process.argv[2]);

function upper(buffer,encoding,next){
  this.push(buffer.toString().toUpperCase());
  next();
}
