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

// 입력의 크기가 20으로 재귀적 수행이 가능한 시간복잡도에서는 백트래킹 기법이 시간면에서 우세하지만 크기가 20을 초과한다면 비트마스크 기법을 적용해야 한다.

// 비트마스크 풀이법
// function Solution() {
//   const N = Number(input());
//   const S = input().split(' ').map(Number);
//   const check = new Array(20 * 100000).fill(false);

//   for (let i = 1; i < 1 << N; i++) {
//     let sum = 0;
//     for (let j = 0; j < N; j++) {
//       if (i & (1 << j)) {
//         sum += S[j];
//       }
//     }

//     check[sum] = true;
//   }

//   for (let i = 1; i < check.length; i++) {
//     if (!check[i]) return i;
//   }
// }

// 백트래킹 풀이법
function Solution() {
  const N = Number(input());
  const S = input().split(' ').map(Number);
  const check = new Array(20 * 100000).fill(false);

  const dfs = (idx, sum) => {
    if (idx === N) {
      check[sum] = true;
      return;
    }

    dfs(idx + 1, sum + S[idx]);
    dfs(idx + 1, sum);
  };

  dfs(0, 0);
  for (let i = 1; i < check.length; i++) {
    if (!check[i]) return i;
  }
}
