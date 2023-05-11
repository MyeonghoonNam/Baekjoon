const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `9
5 12 7 10 9 1 2 3 11
13`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 2차 해결
// 특정 2개의 위치의 합이 X인 경우의 수를 구할 때 반복문 한 번의 순회로 문제 해결 가능
const solution = () => {
  const N = Number(input());
  const numbers = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  const X = Number(input());
  let result = 0;

  let start = 0;
  let end = N - 1;

  while (start < end) {
    const sum = numbers[start] + numbers[end];

    if (sum <= X) {
      start += 1;
    } else {
      end -= 1;
    }

    if (sum === X) {
      result += 1;
    }
  }

  return result;
};

// const solution = () => {
//   const N = Number(input());
//   const arr = input().split(' ').map(Number);
//   const X = Number(input());

//   arr.sort((a, b) => a - b);

//   let start = 0;
//   let end = N - 1;
//   let result = 0;

//   while(start < end) {
//     let sum = arr[start] + arr[end];

//     if(sum <= X) {
//       start++;
//     } else if(sum > X) {
//       end--;
//     }

//     if(sum === X) {
//       result++;
//     }
//   }

//   return result;
// };

console.log(solution());
