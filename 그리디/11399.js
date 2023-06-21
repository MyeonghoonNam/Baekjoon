const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
3 1 4 3 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 2차 해결
const solution = () => {
  const N = Number(input());
  const P = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  let result = 0;

  const reduceCallback = (acc, cur) => {
    acc += cur;
    result += acc;

    return acc;
  };

  P.reduce(reduceCallback, 0);

  return result;
};

console.log(solution());

// 1차 해결
// const solution = () => {
//   const N = Number(input());
//   const times = input()
//     .split(" ")
//     .map(Number)
//     .sort((a, b) => a - b);

//   let result = 0;

//   times.reduce((acc, cur) => {
//     acc += cur;
//     result += acc;

//     return acc;
//   }, 0);

//   return result;
// };

// console.log(solution());
