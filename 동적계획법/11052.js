const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
1 5 6 7`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const cards = input().split(" ").map(Number);
  const DP = new Array(N + 1).fill(0);

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= i; j++) {
      DP[i] = Math.max(DP[i], DP[i - j] + cards[j - 1]);
    }
  }

  return DP[N];
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
//     const cards = input.shift().split(' ').map(Number);
//     cards.unshift(0);

//     const dp = [0, cards[1]];
//     for (let i = 2; i <= N; i++) {
//       dp[i] = 0;

//       for (let j = 1; j <= i; j++) {
//         dp[i] = Math.max(dp[i], dp[i - j] + cards[j]);
//       }
//     }

//     return dp[N];
//   }
// });
