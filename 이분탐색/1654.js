const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 11
802
743
457
539`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 4차 해결
const solution = () => {
  const [K, N] = input().split(" ").map(Number);
  const lines = [];

  for (let i = 0; i < K; i++) {
    lines.push(Number(input()));
  }

  let start = 0;
  let end = Math.max(...lines);
  let result = 0;

  while (start <= end) {
    const mid = parseInt((start + end) / 2);
    let count = 0;

    for (let i = 0; i < K; i++) {
      count += parseInt(lines[i] / mid);
    }

    if (count < N) {
      end = mid - 1;
    } else {
      result = mid;
      start = mid + 1;
    }
  }

  return result;
};

console.log(solution());

// 3차해결
// const solution = () => {
//   const [K, N] = input().split(" ").map(Number);
//   const lines = [];

//   for (let i = 0; i < K; i++) {
//     lines.push(Number(input()));
//   }

//   let start = 1;
//   let end = Math.max(...lines);
//   let result = 0;

//   while (start <= end) {
//     const mid = parseInt((start + end) / 2);
//     let cutLineSum = 0;

//     for (let i = 0; i < K; i++) {
//       cutLineSum += parseInt(lines[i] / mid);
//     }

//     if (cutLineSum < N) {
//       end = mid - 1;
//     } else {
//       result = mid;
//       start = mid + 1;
//     }
//   }

//   return result;
// };

// 2차 해결
// const solution = () => {
//   const [N, M] = input().split(" ").map(Number);
//   const lines = [];

//   for (let i = 0; i < N; i++) {
//     lines.push(Number(input()));
//   }

//   let low = 0;
//   let high = Math.max(...lines);

//   while (low <= high) {
//     const mid = parseInt((low + high) / 2);
//     let totalLine = 0;

//     for (let i = 0; i < N; i++) {
//       const line = lines[i];
//       totalLine += parseInt(line / mid);
//     }

//     if (totalLine < M) {
//       high = mid - 1;
//     } else {
//       low = mid + 1;
//     }
//   }

//   return high;
// };

// console.log(solution());

// 1차 해결
// const fs = require('fs');
// const stdin = (
//   process.platform === 'linux'
//     ? fs.readFileSync('/dev/stdin').toString()
//     : `4 11
// 802
// 743
// 457
// 539`
// ).split('\n');

// const input = (() => {
//   let line = 0;
//   return () => stdin[line++];
// })();

// console.log(Solution());

// function Solution() {
//   const [K, N] = input().split(' ').map(Number);
//   const lanLines = [];
//   let result = 0;

//   let maxLanLine = 0;

//   for (let i = 0; i < K; i++) {
//     const lanLine = Number(input());

//     lanLines[i] = lanLine;

//     if (maxLanLine < lanLine) maxLanLine = lanLine;
//   }

//   let low = 1;
//   let high = maxLanLine;

//   while (low <= high) {
//     const mid = Math.floor((low + high) / 2);

//     if (isPossible(mid, lanLines, K, N)) {
//       if (result < mid) {
//         result = mid;
//       }

//       low = mid + 1;
//     } else {
//       high = mid - 1;
//     }
//   }

//   return result;
// }

// function isPossible(length, lanLines, curLineCount, needLineCount) {
//   let count = 0;

//   for (let i = 0; i < curLineCount; i++) {
//     count += Math.floor(lanLines[i] / length);
//   }

//   if (count >= needLineCount) {
//     return true;
//   } else {
//     return false;
//   }
// }
