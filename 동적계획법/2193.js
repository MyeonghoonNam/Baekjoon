const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const DP = [];

  DP[0] = 0n;
  DP[1] = 1n;

  for (let i = 2; i <= N; i++) {
    DP[i] = DP[i - 1] + DP[i - 2];
  }

  return DP[N].toString();
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
//     const N = BigInt(input[0]);

//     const dp = [];

//     dp[0] = 0n;
//     dp[1] = 1n;
//     dp[2] = 1n;

//     for (let i = 3; i <= N; i++) {
//       dp[i] = dp[i - 1] + dp[i - 2];
//     }

//     return dp[N].toString();
//   }
// });
