const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `18`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 2차 해결
const solution = () => {
  const N = Number(input());

  if (N < 5 && N !== 3) return -1;

  const DP = new Array(N + 1).fill(Infinity);

  DP[3] = 1;
  DP[5] = 1;

  for (let i = 6; i <= N; i++) {
    DP[i] = Math.min(DP[i - 3], DP[i - 5]) + 1;
  }

  const result = DP[N] === Infinity ? -1 : DP[N];

  return result;
};

console.log(solution());

// 1차 해결
// const solution = () => {
//   let N = Number(input());
//   let result = 0;
//   let fiveBag = 0;
//   let threeBag = 0;

//   while (true) {
//     if (N < 0) {
//       return -1;
//     }

//     if (N % 5 === 0) {
//       fiveBag += N / 5;
//       result += fiveBag + threeBag;
//       return result;
//     }

//     N -= 3;
//     threeBag += 1;
//   }
// };

// console.log(solution());
