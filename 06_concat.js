'use strict';
let concat = require('concat-stream');

process.stdin
  .pipe(concat(content =>{
    process.stdout
      .write(
        new Buffer(
        content
          .toString()
          .split("")
          .reverse()
          .join("")
        )
      );
  }));
