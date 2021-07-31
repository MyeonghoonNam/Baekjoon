'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `6
1
2
1
2
1
2`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(solution());

function solution() {
  const N = Number(input());
  const card = [];

  for (let i = 0; i < N; i++) {
    card.push(BigInt(input()));
  }

  card.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  let maxCount = 0;
  let curCount = 0;
  let prevNumber = '';
  let largest = 2 ** 62;

  card.forEach((v) => {
    if (prevNumber !== v) {
      prevNumber = v;
      curCount = 0;
    }

    curCount++;

    if (curCount > maxCount || (curCount === maxCount && largest > v)) {
      maxCount = curCount;
      largest = v;
    }
  });

  return String(largest);
}
