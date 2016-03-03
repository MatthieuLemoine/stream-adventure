'use strict';
let ws = require('websocket-stream');

ws('ws://localhost:8099')
  .write('hello\n');
