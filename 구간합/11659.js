const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 3
5 4 3 2 1
1 3
2 4
5 5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * DP[i] = DP[i - 1] + numbers[i], 1 ~ i까지의 구간 합
 * 구간합 = DP[end] - DP[start - 1]
 */

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const numbers = input().split(" ").map(Number);
  const prefixSum = new Array(N + 1).fill(0);
  const result = [];

  for (let i = 1; i <= N; i++) {
    prefixSum[i] = prefixSum[i - 1] + numbers[i - 1];
  }

  for (let i = 0; i < M; i++) {
    const [start, end] = input().split(" ").map(Number);
    result.push(prefixSum[end] - prefixSum[start - 1]);
  }

  return result.join("\n");
};

// const solution = () => {
//   const [N, M] = input().split(" ").map(Number);
//   const numbers = input().split(" ").map(Number);
//   const DP = new Array(N + 1).fill(0);
//   const result = [];

//   for (let i = 1; i <= N; i++) {
//     DP[i] = DP[i - 1] + numbers[i - 1];
//   }

//   for (let i = 1; i <= M; i++) {
//     const [start, end] = input().split(" ").map(Number);
//     const prefix_sum = DP[end] - DP[start - 1];
//     result.push(prefix_sum);
//   }

//   return result.join("\n");
// };

console.log(solution());
