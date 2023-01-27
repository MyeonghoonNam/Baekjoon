const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `9`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 2차 해결
const solution = () => {
  const N = Number(input());
  const DP = [0, 1, 2];

  for (let i = 3; i <= N; i++) {
    DP[i] = (DP[i - 1] + DP[i - 2]) % 10007;
  }

  return DP[N];
};

console.log(solution());

/**
 * DP[0] = 0
 * DP[1] = 1
 * DP[2] = 2
 * DP[3] = 3
 * DP[4] = 5
 *
 * DP[i] = DP[i - 2] + DP[i - 1]
 */
// const solution = () => {
//   const N = Number(input());
//   const DP = new Array(N + 1);

//   DP[0] = 0;
//   DP[1] = 1;
//   DP[2] = 2;

//   for (let i = 3; i <= N; i++) {
//     DP[i] = (DP[i - 2] + DP[i - 1]) % 10007;
//   }

//   return DP[N];
// };

// console.log(solution());
