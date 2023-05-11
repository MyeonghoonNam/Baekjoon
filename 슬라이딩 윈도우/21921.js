const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7 5
1 1 1 1 1 5 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 3차 해결
// 슬라이딩 윈도우
const solution = () => {
  const [N, X] = input().split(" ").map(Number);
  const visitor = input().split(" ").map(Number);
  let sum = 0;
  let maxVisitorCount = 0;
  let termCount = 1;

  for (let i = 0; i < X; i++) {
    sum += visitor[i];
  }

  maxVisitorCount = sum;

  for (let i = X; i < N; i++) {
    sum += visitor[i] - visitor[i - X];

    if (sum > maxVisitorCount) {
      maxVisitorCount = sum;
      termCount = 1;
    } else if (sum === maxVisitorCount) {
      termCount += 1;
    }
  }

  if (maxVisitorCount === 0) {
    return "SAD";
  }

  return `${maxVisitorCount}\n${termCount}`;
};

// 2차해결
// 슬라이딩 윈도우
// const solution = () => {
//   const [N, X] = input().split(" ").map(Number);
//   const day = input().split(" ").map(Number);
//   let max = 0;
//   let sum = 0;
//   let count = 1;

//   for (let i = 0; i < X; i++) {
//     sum += day[i];
//   }

//   max = sum;

//   for (let i = X; i < N; i++) {
//     sum += day[i] - day[i - X];

//     if (sum > max) {
//       max = sum;
//       count = 1;
//     } else if (sum === max) {
//       count += 1;
//     }
//   }

//   if (max === 0) {
//     return "SAD";
//   }

//   return `${max}\n${count}`;
// };

// 슬라이딩 윈도우
// const solution = () => {
//   const [N, X] = input().split(" ").map(Number);
//   const arr = input().split(" ").map(Number);
//   let sum = 0;

//   for (let i = 0; i < X; i++) {
//     sum += arr[i];
//   }

//   let result = sum;
//   let count = 1;

//   for (let i = X; i < N; i++) {
//     sum += arr[i] - arr[i - X];

//     if (sum >= result) {
//       if (sum === result) {
//         count++;
//       } else {
//         result = sum;
//         count = 1;
//       }
//     }
//   }

//   if (result === 0) {
//     return "SAD";
//   } else {
//     return `${result}\n${count}`;
//   }
// };

// 누적합
// const solution = () => {
//   const [N, X] = input().split(" ").map(Number);
//   const arr = input().split(" ").map(Number);
//   const prefix_sum = [0];

//   let sum = 0;
//   for (let i = 0; i < N; i++) {
//     sum += arr[i];
//     prefix_sum.push(sum);
//   }

//   let result = 0;
//   let count = 1;
//   for (let i = X; i <= N; i++) {
//     let value = prefix_sum[i] - prefix_sum[i - X];

//     if (value >= result) {
//       if (value === result) {
//         count++;
//       } else {
//         result = value;
//         count = 1;
//       }
//     }
//   }

//   if (result === 0) {
//     return "SAD";
//   } else {
//     return `${result}\n${count}`;
//   }
// };

console.log(solution());
