const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10 15
5 1 3 5 10 7 4 9 2 8`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 2차 해결
const solution = () => {
  const [N, S] = input().split(" ").map(Number);
  const numbers = input().split(" ").map(Number);
  let result = Infinity;

  let start = 0;
  let end = 0;
  let sum = 0;

  while (end <= N) {
    if (sum >= S) {
      result = Math.min(result, end - start);
      sum -= numbers[start];
      start += 1;
    } else {
      sum += numbers[end];
      end += 1;
    }
  }

  return result === Infinity ? 0 : result;
};

// 1차 해결
// const solution = () => {
//   const [N, S] = input().split(" ").map(Number);
//   const arr = input().split(" ").map(Number);

//   let result = Infinity;
//   let start = 0;
//   let end = 0;
//   let sum = 0;

//   while (start <= end && end <= N) {
//     if (sum >= S) {
//       result = Math.min(result, end - start);
//       sum -= arr[start];
//       start += 1;
//     } else {
//       sum += arr[end];
//       end += 1;
//     }
//   }

//   return result !== Infinity ? result : 0;
// };

console.log(solution());
