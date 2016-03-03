'use strict';
let combine  = require('stream-combiner');
let through2 = require('through2');
let split    = require('split');
let zlib     = require('zlib');

module.exports = function(){
  let stock = {
    books : []
  };
  return combine(
    split(),
    through2(function(line,_,next){
      if(line.length === 0) return next();
      let obj = JSON.parse(line);
      if(obj.type === "genre"){
        if(stock.name){
          this.push(JSON.stringify(stock)+'\n');
        }
        stock.name = obj.name;
        stock.books = [];
      }
      else{
        stock.books.push(obj.name);
      }
      next();
    },function(done){
      this.push(JSON.stringify(stock)+'\n');
      done();
    }),
    zlib.createGzip()
  );
};
