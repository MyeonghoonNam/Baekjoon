const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10
10 -4 3 1 5 6 -35 12 21 -1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 문제 2차 해결
const solution = () => {
  const N = Number(input());
  const arr = input().split(" ").map(Number);
  const DP = [arr[0]];

  for (let i = 1; i < N; i++) {
    DP[i] = Math.max(DP[i - 1] + arr[i], arr[i]);
  }

  const result = Math.max(...DP);

  return result;
};

console.log(solution());

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
//     const arr = input.shift().split(' ').map(Number);

//     const dp = [arr[0]];
//     for (let i = 1; i < N; i++) {
//       dp[i] = Math.max(dp[i - 1] + arr[i], arr[i]);
//     }

//     const result = Math.max(...dp);

//     return result;
//   }
// });
