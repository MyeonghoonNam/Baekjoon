const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `00009-00009`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 2차 해결
const solution = () => {
  const expression = input().split("-");
  let result = 0;

  for (let i = 0; i < expression.length; i++) {
    const sum = expression[i]
      .split("+")
      .map(Number)
      .reduce((acc, cur) => acc + cur);

    i === 0 ? (result += sum) : (result -= sum);
  }

  return result;
};

console.log(solution());

// 1차 해결
// const solution = () => {
//   const groups = input().split("-");
//   let result = 0;

//   for (let i = 0; i < groups.length; i++) {
//     const sum = groups[i]
//       .split("+")
//       .map(Number)
//       .reduce((acc, cur) => acc + cur);

//     i === 0 ? (result += sum) : (result -= sum);
//   }

//   return result;
// };

// console.log(solution());
