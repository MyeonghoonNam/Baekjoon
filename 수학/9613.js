const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `3
4 10 20 30 40
3 7 5 12
3 125 15 25`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 완전탐색을 이용한 문제 풀이
Solution();

function Solution() {
  const T = Number(input());

  for (let i = 0; i < T; i++) {
    const arr = input().split(' ').map(Number);
    const N = arr.shift();
    let sum = 0;

    for (let j = 0; j < N; j++) {
      for (let k = j + 1; k < N; k++) {
        sum += GCD(arr[j], arr[k]);
      }
    }

    console.log(sum);
  }
}

function GCD(a, b) {
  while (b !== 0) {
    const r = a % b;

    a = b;
    b = r;
  }

  return a;
}

// 백트래킹을 이용한 문제 풀이 => 백트래킹 활용 조합 풀이가 성능 우세
// let N = 0;
// let arr = [];
// let visited = [];
// let result = [];
// let sum = 0;

// function Solution() {
//   const T = Number(input());

//   for (let i = 0; i < T; i++) {
//     arr = input().split(' ').map(Number);
//     N = arr.shift();
//     visited = new Array(N).fill(false);
//     sum = 0;

//     DFS(0, 0);
//     console.log(sum);
//   }
// }

// function DFS(idx, cnt) {
//   if (cnt === 2) {
//     sum += GCD(result[0], result[1]);
//     return;
//   }

//   for (let i = idx; i < N; i++) {
//     if (!visited[i]) {
//       visited[i] = true;
//       result[cnt] = arr[i];
//       DFS(i, cnt + 1);
//       visited[i] = false;
//     }
//   }
// }

// function GCD(a, b) {
//   while (b !== 0) {
//     const r = a % b;

//     a = b;
//     b = r;
//   }

//   return a;
// }
