const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `200`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 2차 해결
const solution = () => {
  const S = Number(input());
  let currentNumber = 0;
  let sum = 0;

  while (sum <= S) {
    currentNumber += 1;
    sum += currentNumber;
  }

  const result = currentNumber - 1;

  return result;
};

console.log(solution());

// 1차 해결
// const solution = () => {
//   const S = Number(input());

//   let sum = 0;
//   let currentNumber = 0;

//   while (sum <= S) {
//     currentNumber += 1;
//     sum += currentNumber;
//   }

//   const result = currentNumber - 1;

//   return result;
// };

// console.log(solution());
