'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `입력관리 !`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();
