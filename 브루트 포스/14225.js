'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `4
2 1 2 7`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

// 비트마스크 풀이법
function Solution() {
  const N = Number(input());
  const S = input().split(' ').map(Number);
  const check = new Array(20 * 100000).fill(false);

  for (let i = 1; i < 1 << N; i++) {
    let sum = 0;
    for (let j = 0; j < N; j++) {
      if (i & (1 << j)) {
        sum += S[j];
      }
    }

    check[sum] = true;
  }

  for (let i = 1; i < check.length; i++) {
    if (!check[i]) return i;
  }
}
