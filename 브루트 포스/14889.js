'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `6
0 1 2 3 4 5
1 0 2 3 4 5
1 2 0 3 4 5
1 2 3 0 4 5
1 2 3 4 0 5
1 2 3 4 5 0`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

// 비트마스크 풀이법 적용
// 동일 문제인 15661번 문제는 백트래킹 방법으로 풀이 적용
function Solution() {
  const N = Number(input());
  const map = [];
  let result = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < N; i++) {
    map[i] = input().split(' ').map(Number);
  }

  for (let i = 0; i < 1 << N; i++) {
    const start = [];
    const link = [];

    let cnt = 0;
    for (let k = 0; k < N; k++) {
      if ((i & (1 << k)) === 0) {
        start.push(k);
        cnt++;
      } else {
        link.push(k);
      }
    }

    if (cnt !== N / 2) continue;

    let startSum = 0;
    let linkSum = 0;
    for (let i = 0; i < N / 2; i++) {
      for (let j = 0; j < N / 2; j++) {
        if (i === j) continue;

        startSum += map[start[i]][start[j]];
        linkSum += map[link[i]][link[j]];
      }
    }

    const diff = Math.abs(startSum - linkSum);
    if (result > diff) result = diff;
  }

  return result;
}
