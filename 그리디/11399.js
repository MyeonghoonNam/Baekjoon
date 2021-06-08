'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `5
3 1 4 3 2`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const withdrawal = input().split(' ').map(Number);

  withdrawal.sort((a, b) => a - b);

  let sum = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j <= i; j++) {
      sum += withdrawal[j];
    }
  }

  return sum;
}
