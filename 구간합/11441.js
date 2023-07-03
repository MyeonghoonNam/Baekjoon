const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
10 20 30 40 50
5
1 3
2 4
3 5
1 5
4 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 2차 풀이
const solution = () => {
  const N = Number(input());
  const numbers = input().split(" ").map(Number);
  const M = Number(input());

  const prefixSum = [0];
  let sum = 0;

  for (let i = 0; i < N; i++) {
    sum += numbers[i];
    prefixSum.push(sum);
  }

  const result = [];

  for (let i = 0; i < M; i++) {
    const [start, end] = input().split(" ").map(Number);
    result.push(prefixSum[end] - prefixSum[start - 1]);
  }

  return result.join("\n");
};

console.log(solution());

// 1차 풀이
// const solution = () => {
//   const N = Number(input());
//   const numbers = input().split(" ").map(Number);
//   const M = Number(input());

//   const prefixSum = [0];
//   let sum = 0;

//   for (let i = 0; i < N; i++) {
//     sum += numbers[i];
//     prefixSum.push(sum);
//   }

//   const result = [];

//   for (let i = 0; i < M; i++) {
//     const [start, end] = input().split(" ").map(Number);
//     result.push(prefixSum[end] - prefixSum[start - 1]);
//   }

//   return result.join("\n");
// };

// console.log(solution());
