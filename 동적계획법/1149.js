const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `8
71 39 44
32 83 55
51 37 63
89 29 100
83 58 11
65 13 15
47 25 29
60 66 19`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 3차 해결
const solution = () => {
  const N = Number(input());
  const DP = Array.from(new Array(N + 1), () => new Array(3).fill(0));
  const cost = [[]];

  for (let i = 0; i < N; i++) {
    cost.push(input().split(" ").map(Number));
  }

  for (let i = 1; i <= N; i++) {
    DP[i][0] = Math.min(DP[i - 1][1], DP[i - 1][2]) + cost[i][0];
    DP[i][1] = Math.min(DP[i - 1][0], DP[i - 1][2]) + cost[i][1];
    DP[i][2] = Math.min(DP[i - 1][0], DP[i - 1][1]) + cost[i][2];
  }

  const result = Math.min(...DP[N]);

  return result;
};

console.log(solution());

// 2차 해결
// const solution = () => {
//   const N = Number(input());
//   const cost = Array.from(new Array(N + 1), () => new Array(3).fill(0));

//   for (let i = 1; i <= N; i++) {
//     cost[i] = input().split(" ").map(Number);
//   }

//   const DP = Array.from(new Array(N + 1), () => new Array(3).fill(0));

//   DP[0] = cost[0];

//   for (let i = 1; i <= N; i++) {
//     DP[i][0] = Math.min(DP[i - 1][1], DP[i - 1][2]) + cost[i][0];
//     DP[i][1] = Math.min(DP[i - 1][0], DP[i - 1][2]) + cost[i][1];
//     DP[i][2] = Math.min(DP[i - 1][0], DP[i - 1][1]) + cost[i][2];
//   }

//   return Math.min(...DP[N]);
// };

// console.log(solution());

// 1차 해결
// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const input = [];
// rl.on('line', (line) => {
//   // 입력 관리
//   input.push(line);
// }).on('close', () => {
//   // 구현
//   console.log(Solution(input));

//   function Solution(input) {
//     const N = Number(input.shift());

//     const cost = Array.from(new Array(N + 1), () => new Array(3).fill(0));

//     for (let i = 1; i <= N; i++) {
//       cost[i] = input.shift().split(' ').map(Number);
//     }

//     const dp = Array.from(new Array(N + 1), () => new Array(3).fill(0));

//     dp[0] = cost[0];
//     for (let i = 1; i <= N; i++) {
//       dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + cost[i][0];
//       dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + cost[i][1];
//       dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + cost[i][2];
//     }

//     return Math.min(...dp[N]);
//   }
// });
