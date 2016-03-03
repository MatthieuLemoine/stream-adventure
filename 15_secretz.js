'use strict';
let crypto   = require('crypto');
let zlib     = require('zlib');
let parser   = require('tar').Parse();
let through2 = require('through2');

parser.on('entry',e => {
  if(e.type === 'File')
    e.pipe(crypto.createHash('md5',{encoding : 'hex'}))
      .pipe(through2(function(hash,_,next){
        this.push(hash + ' ' + e.path + '\n');
        next();
      }))
      .pipe(process.stdout);
});

process.stdin
  .pipe(crypto.createDecipher(process.argv[2],process.argv[3]))
  .pipe(zlib.createGunzip())
  .pipe(parser);
