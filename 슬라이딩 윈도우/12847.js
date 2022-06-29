const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 3
10 20 30 20 10`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 누적 합 알고리즘
// const solution = () => {
//   const [N, M] = input().split(" ").map(Number);
//   const arr = input().split(" ").map(Number);
//   const prefix_sum = [0];

//   let sum = 0;
//   for (let i = 0; i < N; i++) {
//     sum += arr[i];
//     prefix_sum.push(sum);
//   }

//   let result = 0;
//   for (let i = M; i <= N; i++) {
//     let sum = prefix_sum[i] - prefix_sum[i - M];
//     result = Math.max(result, sum);
//   }

//   return result;
// };

// 슬라이딩 윈도우 알고리즘
const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const arr = input().split(" ").map(Number);
  let result = 0;
  let sum = 0;

  for (let i = 0; i < M; i++) {
    sum += arr[i];
  }

  result = sum;

  for (let i = M; i < N; i++) {
    sum += arr[i] - arr[i - M];
    result = Math.max(result, sum);
  }

  return result;
};

console.log(solution());
