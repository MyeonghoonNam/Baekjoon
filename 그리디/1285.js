'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `3
HHT
THH
THT`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const map = [];

  for (let i = 0; i < N; i++) {
    map[i] = input().split('');

    for (let j = 0; j < N; j++) {
      if (map[i][j] === 'T') {
        map[i][j] = 1;
      } else {
        map[i][j] = 0;
      }
    }
  }

  const flip = (x, y) => {
    return map[x][y] ^ 1;
  };

  // 최댓값
  let result = 400;

  for (let i = 0; i < (1 << N) - 1; i++) {
    let sum = 0;

    for (let y = 0; y < N; y++) {
      let tail = 0;

      for (let x = 0; x < N; x++) {
        let cur = map[x][y];

        if ((i & (1 << x)) !== 0) {
          cur = flip(x, y);
        }

        if (cur === 1) tail++;
      }

      sum += Math.min(tail, N - tail);
    }
    if (result > sum) result = sum;
  }

  return result;
}
