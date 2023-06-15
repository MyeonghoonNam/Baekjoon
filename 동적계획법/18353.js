const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7
15 11 4 8 5 2 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 2차 해결
const solution = () => {
  const N = Number(input());
  const soldiers = input().split(" ").map(Number);
  const DP = new Array(N).fill(1);

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (soldiers[j] > soldiers[i]) {
        DP[i] = Math.max(DP[i], DP[j] + 1);
      }
    }
  }

  const result = N - Math.max(...DP);

  return result;
};

console.log(solution());

// 1차 해결
// const solution = () => {
//   const N = Number(input());
//   const soldier = input().split(" ").map(Number).reverse();
//   const DP = new Array(N).fill(1);

//   for (let i = 1; i < N; i++) {
//     for (let j = 0; j < i; j++) {
//       if (soldier[j] < soldier[i]) {
//         DP[i] = Math.max(DP[i], DP[j] + 1);
//       }
//     }
//   }

//   return N - Math.max(...DP);
// };

// console.log(solution());
