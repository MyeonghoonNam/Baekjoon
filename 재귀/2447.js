'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux' ? fs.readFileSync('/dev/stdin').toString() : `27`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const result = [];

Solution();

function Solution() {
  const N = Number(input());

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      printStar(i, j, N);
    }
    result.push('\n');
  }

  console.log(result.join(''));

  return;
}

function printStar(i, j, N) {
  if (parseInt(i / N) % 3 === 1 && parseInt(j / N) % 3 === 1) {
    result.push(' ');
  } else {
    if (Math.floor(N / 3) === 0) {
      result.push('*');
    } else {
      printStar(i, j, N / 3);
    }
  }
}
