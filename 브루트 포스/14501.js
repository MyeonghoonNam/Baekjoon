// 테스트 케이스
// 7
// 3 10
// 5 20
// 1 10
// 1 20
// 2 15
// 4 40
// 2 200

// 10
// 1 1
// 1 2
// 1 3
// 1 4
// 1 5
// 1 6
// 1 7
// 1 8
// 1 9
// 1 10

// 10
// 5 10
// 5 9
// 5 8
// 5 7
// 5 6
// 5 10
// 5 9
// 5 8
// 5 7
// 5 6

// 10
// 5 50
// 4 40
// 3 30
// 2 20
// 1 10
// 1 10
// 2 20
// 3 30
// 4 40
// 5 50

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `10
1 1
1 2
1 3
1 4
1 5
1 6
1 7
1 8
1 9
1 10`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

// 브루트포스 풀이
function Solution() {
  const N = Number(input());
  const T = new Array(16).fill(0);
  const P = new Array(16).fill(0);

  let result = 0;

  for (let i = 1; i <= N; i++) {
    const info = input().split(' ').map(Number);

    T[i] = info[0];
    P[i] = info[1];
  }

  const dfs = (day, cost) => {
    if (day > N) {
      result = Math.max(result, cost);
      return;
    }

    if (day + T[day] <= N + 1) dfs(day + T[day], cost + P[day]);
    if (day + 1 <= N + 1) dfs(day + 1, cost);
  };

  dfs(1, 0);

  return result;
}

// DP를 활용한 풀이
// function Solution() {
//   const N = Number(input());
//   const T = [0];
//   const P = [0];

//   for (let i = 0; i < N; i++) {
//     const [day, price] = input().split(' ').map(Number);

//     T.push(day);
//     P.push(price);
//   }

//   const DP = new Array(T.length).fill(0);

//   for (let i = 1; i < DP.length; i++) {
//     DP[i] = P[i];

//     if (i + T[i] - 1 > N) {
//       DP[i] = DP[i - 1];
//       continue;
//     }

//     for (let j = 1; j < i; j++) {
//       if (j + T[j] <= i) {
//         DP[i] = Math.max(DP[i], DP[j] + P[i]);
//       }
//     }
//   }

//   return Math.max(...DP.slice(1, N + 1));
// }
