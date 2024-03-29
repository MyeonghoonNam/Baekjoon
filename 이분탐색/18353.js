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

// 2차 해결 - 동적계획법
const solution = () => {
  const N = Number(input());
  const numbers = input().split(" ").map(Number).reverse();
  const DP = new Array(N).fill(1);

  for (let i = 1; i < N; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (numbers[j] < numbers[i]) {
        DP[i] = Math.max(DP[i], DP[j] + 1);
      }
    }
  }

  const result = N - Math.max(...DP);

  return result;
};

console.log(solution());

// 1차 해결 - 이분탐색
// const solution = () => {
//   const N = Number(input());
//   const LIS = [0];
//   const numbers = input().split(" ").map(Number);

//   const lowerBound = (arr, target) => {
//     let start = 0;
//     let end = arr.length;

//     while (start < end) {
//       const mid = parseInt((start + end) / 2);

//       if (arr[mid] >= target) {
//         end = mid;
//       } else {
//         start = mid + 1;
//       }
//     }

//     return end;
//   };

//   numbers.reverse();

//   for (let i = 0; i < N; i++) {
//     const number = numbers[i];

//     if (LIS[LIS.length - 1] < number) {
//       LIS.push(number);
//     } else {
//       let index = lowerBound(LIS, number);
//       LIS[index] = number;
//     }
//   }

//   const result = N - (LIS.length - 1);

//   return result;
// };

// console.log(solution());
