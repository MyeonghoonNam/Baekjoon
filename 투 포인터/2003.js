const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10 5
1 2 3 4 2 5 3 1 1 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 2차 해결
const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const numbers = input().split(" ").map(Number);
  let result = 0;

  let start = 0;
  let end = 0;
  let sum = 0;

  while (start < N) {
    while (end < N && sum < M) {
      sum += numbers[end];
      end += 1;
    }

    if (sum === M) {
      result += 1;
    }

    sum -= numbers[start];
    start += 1;
  }

  return result;
};

// 1차 해결
// const solution = () => {
//   const [N, M] = input().split(' ').map(Number);
//   const arr = input().split(' ').map(Number);

//   let result = 0;
//   let sum = 0;
//   let end = 0;

//   for(let start = 0; start < N; start++) {
//     while(end < N && sum < M) {
//       sum += arr[end];
//       end++;
//     }

//     if(sum === M) {
//       result++;
//     }

//     sum -= arr[start];
//   }

//   return result;
// };

console.log(solution());
