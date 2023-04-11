const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
7`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 2차 해결
const solution = () => {
  let result = 0;
  const N = Number(input());
  const K = Number(input());

  let start = 1;
  let end = K; // 10 ** 10이 최대 가능 범위

  while (start <= end) {
    const mid = parseInt((start + end) / 2);
    let total = 0;

    for (let i = 1; i <= N; i++) {
      total += Math.min(parseInt(mid / i), N);
    }

    if (total < K) {
      start = mid + 1;
    } else {
      result = mid;
      end = mid - 1;
    }
  }

  return result;
};

// 1차 해결
// const solution = () => {
//   const N = Number(input());
//   const K = Number(input());
//   let result = 0;

//   let low = 1;
//   let high = K;

//   while(low <= high) {
//     let count = 0;
//     const mid = Math.floor((low + high) / 2);

//     for(let i = 1; i <= N; i++) {
//       count += Math.min(Math.floor(mid / i), N);
//     }

//     if(count < K) {
//       low = mid + 1;
//     } else {
//       result = mid;
//       high = mid - 1;
//     }
//   }

//   return result;
// };

console.log(solution());
